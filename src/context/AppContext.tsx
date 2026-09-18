import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ClientProfile,
  ContentPost,
  AnalyticsData,
  ProjectMilestone,
  ServiceRequest,
  PostComment,
} from '../types';
import {
  CLIENT_PROFILES,
  INITIAL_POSTS,
  INITIAL_ANALYTICS,
  INITIAL_MILESTONES,
  INITIAL_SERVICE_REQUESTS,
} from '../data/mockData';

export type UserRole = 'agency' | 'client';

interface AppContextType {
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
  createPostDraft: (newPost: Omit<ContentPost, 'id' | 'comments' | 'version' | 'status'>) => void;
  
  // Milestones
  toggleTask: (milestoneId: string, taskId: string) => void;
  updateMilestoneProgress: (milestoneId: string, progress: number) => void;
  addMilestone: (milestone: Omit<ProjectMilestone, 'id'>) => void;
  
  // Service Requests
  submitServiceRequest: (request: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>) => ServiceRequest;
  updateRequestStatus: (requestId: string, status: ServiceRequest['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'cortouch_media_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('agency');
  const [selectedClientId, setSelectedClientId] = useState<string>('client-1');
  const [clients] = useState<ClientProfile[]>(CLIENT_PROFILES);
  
  // Saved state with fallback to mock data
  const [posts, setPosts] = useState<ContentPost[]>(() => {
    try {
      const saved = localStorage.getItem(`₦{LOCAL_STORAGE_KEY}_posts`);
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [analytics] = useState<Record<string, AnalyticsData>>(INITIAL_ANALYTICS);

  const [milestones, setMilestones] = useState<ProjectMilestone[]>(() => {
    try {
      const saved = localStorage.getItem(`₦{LOCAL_STORAGE_KEY}_milestones`);
      return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
    } catch {
      return INITIAL_MILESTONES;
    }
  });

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(() => {
    try {
      const saved = localStorage.getItem(`₦{LOCAL_STORAGE_KEY}_requests`);
      return saved ? JSON.parse(saved) : INITIAL_SERVICE_REQUESTS;
    } catch {
      return INITIAL_SERVICE_REQUESTS;
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`₦{LOCAL_STORAGE_KEY}_posts`, JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(`₦{LOCAL_STORAGE_KEY}_milestones`, JSON.stringify(milestones));
    } catch (e) {
      console.error(e);
    }
  }, [milestones]);

  useEffect(() => {
    try {
      localStorage.setItem(`₦{LOCAL_STORAGE_KEY}_requests`, JSON.stringify(serviceRequests));
    } catch (e) {
      console.error(e);
    }
  }, [serviceRequests]);

  const currentClient = clients.find(c => c.id === selectedClientId) || clients[0];
  const clientPosts = posts.filter(p => p.clientId === selectedClientId);
  const pendingApprovalsCount = posts.filter(p => p.status === 'pending_approval' && (userRole === 'agency' || p.clientId === selectedClientId)).length;
  const currentAnalytics = analytics[selectedClientId] || analytics['client-1'];
  const clientMilestones = milestones.filter(m => m.clientId === selectedClientId);

  const approvePost = (postId: string, feedbackNote?: string) => {
    const authorName = userRole === 'client' ? `₦{currentClient.primaryContact} (Client)` : 'Cortouch Media Lead';
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const newComments: PostComment[] = [...post.comments];
          if (feedbackNote) {
            newComments.push({
              id: `c-${Date.now()}`,
              author: authorName,
              authorRole: userRole,
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
  };

  const requestPostChanges = (postId: string, feedbackNote: string) => {
    const authorName = userRole === 'client' ? `₦{currentClient.primaryContact} (Client)` : 'Cortouch Media Lead';
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const newComments: PostComment[] = [
            ...post.comments,
            {
              id: `c-${Date.now()}`,
              author: authorName,
              authorRole: userRole,
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
  };

  const addPostComment = (postId: string, commentText: string) => {
    const authorName = userRole === 'client' ? `₦{currentClient.primaryContact} (Client)` : 'Cortouch Creative Specialist';
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
                authorRole: userRole,
                text: commentText,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return post;
      })
    );
  };

  const createPostDraft = (newPost: Omit<ContentPost, 'id' | 'comments' | 'version' | 'status'>) => {
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
  };

  const toggleTask = (milestoneId: string, taskId: string) => {
    setMilestones(prev =>
      prev.map(milestone => {
        if (milestone.id === milestoneId) {
          const updatedTasks = milestone.tasks.map(t =>
            t.id === taskId ? { ...t, done: !t.done } : t
          );
          const completedCount = updatedTasks.filter(t => t.done).length;
          const calculatedProgress = Math.round((completedCount / updatedTasks.length) * 100);
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
  };

  const updateMilestoneProgress = (milestoneId: string, progress: number) => {
    setMilestones(prev =>
      prev.map(m => {
        if (m.id === milestoneId) {
          const status = progress >= 100 ? 'completed' : progress > 0 ? 'in_progress' : 'upcoming';
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
  };

  const submitServiceRequest = (requestData: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: ServiceRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setServiceRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  const updateRequestStatus = (requestId: string, status: ServiceRequest['status']) => {
    setServiceRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status } : r))
    );
  };

  return (
    <AppContext.Provider
      value={{
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
