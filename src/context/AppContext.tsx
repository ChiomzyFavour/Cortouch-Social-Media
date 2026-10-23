import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ClientProfile,
  ContentPost,
  AnalyticsData,
  ProjectMilestone,
  ServiceRequest,
  PostComment,
  User,
  UserRole,
} from '../types';
import {
  CLIENT_PROFILES,
  INITIAL_POSTS,
  INITIAL_ANALYTICS,
  INITIAL_MILESTONES,
  INITIAL_SERVICE_REQUESTS,
} from '../data/mockData';
import { apiClient } from '../services/apiClient';

interface AppContextType {
  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  login: (credentials: { email: string; password: string }) => Promise<User>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    companyName?: string;
  }) => Promise<User>;
  logout: () => Promise<void>;

  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  selectedClientId: string;
  setSelectedClientId: (id: string) => void;
  clients: ClientProfile[];
  currentClient: ClientProfile;
  posts: ContentPost[];
  clientPosts: ContentPost[];
  pendingApprovalsCount: number;
  analytics: Record<string, AnalyticsData>;
  currentAnalytics: AnalyticsData;
  milestones: ProjectMilestone[];
  clientMilestones: ProjectMilestone[];
  serviceRequests: ServiceRequest[];

  // Actions
  approvePost: (postId: string, feedbackNote?: string) => void;
  requestPostChanges: (postId: string, feedbackNote: string) => void;
  addPostComment: (postId: string, commentText: string) => void;
  createPostDraft: (
    newPost: Omit<ContentPost, 'id' | 'comments' | 'version' | 'status'>
  ) => void;

  // Milestones
  toggleTask: (milestoneId: string, taskId: string) => void;
  updateMilestoneProgress: (milestoneId: string, progress: number) => void;
  addMilestone: (milestone: Omit<ProjectMilestone, 'id'>) => void;

  // Service Requests
  submitServiceRequest: (
    request: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>
  ) => ServiceRequest;
  updateRequestStatus: (requestId: string, status: ServiceRequest['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'cortouch_media_state_v1';

// Narrow UserRole down to what PostComment / apiClient accept
type ActorRole = 'client' | 'agency';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('cortouch_media_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);

  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const savedUser = localStorage.getItem('cortouch_media_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.role) return parsed.role;
      }
    } catch {}
    return 'agency';
  });

  const [selectedClientId, setSelectedClientId] = useState<string>(() => {
    try {
      const savedUser = localStorage.getItem('cortouch_media_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.clientId) return parsed.clientId;
      }
    } catch {}
    return 'client-1';
  });

  const [clients] = useState<ClientProfile[]>(CLIENT_PROFILES);

  // Verify token on mount if present
  useEffect(() => {
    let isMounted = true;
    async function verifySession() {
      const token = apiClient.getToken();
      if (!token) return;
      try {
        const verifiedUser = await apiClient.getMe();
        if (!isMounted) return;
        if (verifiedUser) {
          setUser(verifiedUser);
          localStorage.setItem('cortouch_media_user', JSON.stringify(verifiedUser));
          setUserRole(verifiedUser.role);
          if (verifiedUser.clientId) {
            setSelectedClientId(verifiedUser.clientId);
          }
        }
      } catch (e) {
        if (!isMounted) return;
        console.warn('Session verification fallback/expired:', e);
        if (
          String(e).includes('expired') ||
          String(e).includes('invalid') ||
          String(e).includes('401')
        ) {
          setUser(null);
          localStorage.removeItem('cortouch_media_user');
          apiClient.setToken(null);
        }
      }
    }
    verifySession();
    return () => {
      isMounted = false;
    };
  }, []);

  // Saved state with fallback to mock data
  const [posts, setPosts] = useState<ContentPost[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_posts`);
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [analytics] = useState<Record<string, AnalyticsData>>(INITIAL_ANALYTICS);

  const [milestones, setMilestones] = useState<ProjectMilestone[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_milestones`);
      return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
    } catch {
      return INITIAL_MILESTONES;
    }
  });

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_requests`);
      return saved ? JSON.parse(saved) : INITIAL_SERVICE_REQUESTS;
    } catch {
      return INITIAL_SERVICE_REQUESTS;
    }
  });

  // Background sync from backend on mount
  useEffect(() => {
    let isMounted = true;
    async function syncFromBackend() {
      try {
        const [backendPosts, backendMilestones, backendRequests] = await Promise.allSettled([
          apiClient.getPosts(),
          apiClient.getMilestones(),
          apiClient.getRequests(),
        ]);

        if (!isMounted) return;

        if (backendPosts.status === 'fulfilled' && backendPosts.value?.length > 0) {
          setPosts(backendPosts.value);
        }
        if (backendMilestones.status === 'fulfilled' && backendMilestones.value?.length > 0) {
          setMilestones(backendMilestones.value);
        }
        if (backendRequests.status === 'fulfilled' && backendRequests.value?.length > 0) {
          setServiceRequests(backendRequests.value);
        }
      } catch (e) {
        console.warn('Backend sync deferred or running local:', e);
      }
    }
    syncFromBackend();
    return () => {
      isMounted = false;
    };
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_posts`, JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_milestones`, JSON.stringify(milestones));
    } catch (e) {
      console.error(e);
    }
  }, [milestones]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_requests`, JSON.stringify(serviceRequests));
    } catch (e) {
      console.error(e);
    }
  }, [serviceRequests]);

  const currentClient = clients.find(c => c.id === selectedClientId) || clients[0];
  const clientPosts = posts.filter(p => p.clientId === selectedClientId);
  const pendingApprovalsCount = posts.filter(
    p =>
      p.status === 'pending_approval' &&
      (userRole === 'agency' || p.clientId === selectedClientId)
  ).length;
  const currentAnalytics = analytics[selectedClientId] || analytics['client-1'];
  const clientMilestones = milestones.filter(m => m.clientId === selectedClientId);

  // Single source of truth for the "actor role" used in comments / API calls.
  // Admins collapse to 'agency' since PostComment + apiClient only accept
  // 'client' | 'agency'.
  const actorRole: ActorRole = userRole === 'client' ? 'client' : 'agency';

  const approvePost = (postId: string, feedbackNote?: string) => {
    const authorName =
      userRole === 'client'
        ? `${currentClient.primaryContact} (Client)`
        : 'Cortouch Media Lead';

    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const newComments: PostComment[] = [...post.comments];
          if (feedbackNote) {
            newComments.push({
              id: `c-${Date.now()}`,
              author: authorName,
              authorRole: actorRole,
              text: `[Approved]: ${feedbackNote}`,
              timestamp: 'Just now',
            });
          }
          return {
            ...post,
            status: 'approved',
            feedbackNotes: 'Client greenlight received',
            comments: newComments,
          };
        }
        return post;
      })
    );

    // Sync to backend
    apiClient
      .approvePost(postId, feedbackNote, authorName, actorRole)
      .catch(err => {
        console.warn('Backend sync notice (approvePost):', err);
      });
  };

  const requestPostChanges = (postId: string, feedbackNote: string) => {
    const authorName =
      userRole === 'client'
        ? `${currentClient.primaryContact} (Client)`
        : 'Cortouch Media Lead';

    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const newComments: PostComment[] = [
            ...post.comments,
            {
              id: `c-${Date.now()}`,
              author: authorName,
              authorRole: actorRole,
              text: feedbackNote,
              timestamp: 'Just now',
            },
          ];
          return {
            ...post,
            status: 'changes_requested',
            feedbackNotes: feedbackNote,
            version: post.version + 1,
            comments: newComments,
          };
        }
        return post;
      })
    );

    // Sync to backend
    apiClient
      .requestChanges(postId, feedbackNote, authorName, actorRole)
      .catch(err => {
        console.warn('Backend sync notice (requestPostChanges):', err);
      });
  };

  const addPostComment = (postId: string, commentText: string) => {
    const authorName =
      userRole === 'client'
        ? `${currentClient.primaryContact} (Client)`
        : 'Cortouch Creative Specialist';

    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `c-${Date.now()}`,
                author: authorName,
                authorRole: actorRole,
                text: commentText,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return post;
      })
    );

    // Sync to backend
    apiClient
      .addComment(postId, commentText, authorName, actorRole)
      .catch(err => {
        console.warn('Backend sync notice (addPostComment):', err);
      });
  };

  const createPostDraft = (
    newPost: Omit<ContentPost, 'id' | 'comments' | 'version' | 'status'>
  ) => {
    const post: ContentPost = {
      ...newPost,
      id: `post-${Date.now()}`,
      status: 'pending_approval',
      version: 1,
      comments: [
        {
          id: `c-${Date.now()}`,
          author: 'Cortouch Creative Lead',
          authorRole: 'agency',
          text: 'New draft submitted for review and approval.',
          timestamp: 'Just now',
        },
      ],
    };
    setPosts(prev => [post, ...prev]);

    // Sync to backend
    apiClient.createDraft(newPost).catch(err => {
      console.warn('Backend sync notice (createPostDraft):', err);
    });
  };

  const toggleTask = (milestoneId: string, taskId: string) => {
    setMilestones(prev =>
      prev.map(milestone => {
        if (milestone.id === milestoneId) {
          const updatedTasks = milestone.tasks.map(t =>
            t.id === taskId ? { ...t, done: !t.done } : t
          );
          const completedCount = updatedTasks.filter(t => t.done).length;
          const calculatedProgress = Math.round(
            (completedCount / updatedTasks.length) * 100
          );
          const updatedStatus: ProjectMilestone['status'] =
            calculatedProgress === 100
              ? 'completed'
              : calculatedProgress > 0
              ? 'in_progress'
              : 'upcoming';

          return {
            ...milestone,
            tasks: updatedTasks,
            progress: calculatedProgress,
            status: updatedStatus,
          };
        }
        return milestone;
      })
    );

    // Sync to backend
    apiClient.toggleTask(milestoneId, taskId).catch(err => {
      console.warn('Backend sync notice (toggleTask):', err);
    });
  };

  const updateMilestoneProgress = (milestoneId: string, progress: number) => {
    setMilestones(prev =>
      prev.map(m => {
        if (m.id === milestoneId) {
          const status =
            progress >= 100 ? 'completed' : progress > 0 ? 'in_progress' : 'upcoming';
          return { ...m, progress, status };
        }
        return m;
      })
    );
  };

  const addMilestone = (milestoneData: Omit<ProjectMilestone, 'id'>) => {
    const newM: ProjectMilestone = {
      ...milestoneData,
      id: `m-${Date.now()}`,
    };
    setMilestones(prev => [...prev, newM]);

    // Sync to backend
    apiClient.createMilestone(milestoneData).catch(err => {
      console.warn('Backend sync notice (addMilestone):', err);
    });
  };

  const submitServiceRequest = (
    requestData: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>
  ) => {
    const newReq: ServiceRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setServiceRequests(prev => [newReq, ...prev]);

    // Sync to backend
    apiClient.submitRequest(requestData).catch(err => {
      console.warn('Backend sync notice (submitServiceRequest):', err);
    });

    return newReq;
  };

  const updateRequestStatus = (
    requestId: string,
    status: ServiceRequest['status']
  ) => {
    setServiceRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status } : r))
    );

    // Sync to backend
    apiClient.updateRequestStatus(requestId, status).catch(err => {
      console.warn('Backend sync notice (updateRequestStatus):', err);
    });
  };

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<User> => {
    setIsLoadingAuth(true);
    try {
      const session = await apiClient.login(credentials);
      setUser(session.user);
      localStorage.setItem('cortouch_media_user', JSON.stringify(session.user));
      setUserRole(session.user.role);
      if (session.user.clientId) {
        setSelectedClientId(session.user.clientId);
      }
      return session.user;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    companyName?: string;
  }): Promise<User> => {
    setIsLoadingAuth(true);
    try {
      const session = await apiClient.register(data);
      setUser(session.user);
      localStorage.setItem('cortouch_media_user', JSON.stringify(session.user));
      setUserRole(session.user.role);
      if (session.user.clientId) {
        setSelectedClientId(session.user.clientId);
      }
      return session.user;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoadingAuth(true);
    try {
      await apiClient.logout();
    } catch {
      // Proceed even if server offline
    } finally {
      setUser(null);
      localStorage.removeItem('cortouch_media_user');
      setIsLoadingAuth(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoadingAuth,
        login,
        register,
        logout,
        userRole,
        setUserRole,
        selectedClientId,
        setSelectedClientId,
        clients,
        currentClient,
        posts,
        clientPosts,
        pendingApprovalsCount,
        analytics,
        currentAnalytics,
        milestones,
        clientMilestones,
        serviceRequests,
        approvePost,
        requestPostChanges,
        addPostComment,
        createPostDraft,
        toggleTask,
        updateMilestoneProgress,
        addMilestone,
        submitServiceRequest,
        updateRequestStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const useAuth = () => useApp();