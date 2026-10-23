import {
  ClientProfile,
  ServicePackage,
  ContentPost,
  AnalyticsData,
  ProjectMilestone,
  ServiceRequest,
  SocialPlatform,
  PostStatus,
  RequestStatus,
  PostComment,
  User,
  AuthSession,
  UserRole,
} from '../types';

const BASE_URL = '/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    try {
      this.token = localStorage.getItem('cortouch_auth_token');
    } catch {
      this.token = null;
    }
  }

  setToken(token: string | null) {
    this.token = token;
    try {
      if (token) {
        localStorage.setItem('cortouch_auth_token', token);
      } else {
        localStorage.removeItem('cortouch_auth_token');
      }
    } catch {
      // ignore storage errors
    }
  }

  getToken(): string | null {
    if (!this.token) {
      try {
        this.token = localStorage.getItem('cortouch_auth_token');
      } catch {
        this.token = null;
      }
    }
    return this.token;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options?.headers as Record<string, string>) || {}),
    };

    const currentToken = this.getToken();
    if (currentToken && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${currentToken}`;
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Network request failed' }));
      throw new Error(err.message || err.error || `HTTP error ${res.status}`);
    }

    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  }

 async register(data: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;              // ← was 'client' | 'agency'
  companyName?: string;
}): Promise<AuthSession> {
    const session = await this.request<AuthSession>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (session?.token) {
      this.setToken(session.token);
    }
    return session;
  }

  async login(credentials: { email: string; password: string }): Promise<AuthSession> {
    const session = await this.request<AuthSession>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (session?.token) {
      this.setToken(session.token);
    }
    return session;
  }

  async getMe(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  async getDemoAccounts(): Promise<Array<{
    email: string;
    name: string;
    role: UserRole;
    companyName: string;
    password: string;
    label: string;
  }>> {
    return this.request('/auth/demo-accounts');
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch {
      // Proceed even if server is offline
    } finally {
      this.setToken(null);
    }
  }

  // --- Clients & Packages ---
  async getClients(): Promise<ClientProfile[]> {
    return this.request<ClientProfile[]>('/clients');
  }

  async getClientById(id: string): Promise<ClientProfile> {
    return this.request<ClientProfile>(`/clients/${id}`);
  }

  async getPackages(): Promise<ServicePackage[]> {
    return this.request<ServicePackage[]>('/clients/packages');
  }

  // --- Content Approval & Posts ---
  async getPosts(filters?: { clientId?: string; status?: PostStatus; platform?: SocialPlatform }): Promise<ContentPost[]> {
    const query = new URLSearchParams();
    if (filters?.clientId) query.set('clientId', filters.clientId);
    if (filters?.status) query.set('status', filters.status);
    if (filters?.platform) query.set('platform', filters.platform);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.request<ContentPost[]>(`/content${queryString}`);
  }

  async createDraft(post: Omit<ContentPost, 'id' | 'comments' | 'version' | 'status'>): Promise<ContentPost> {
    return this.request<ContentPost>('/content/draft', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  }

  async approvePost(id: string, feedbackNote?: string, authorName = 'Client Representative', authorRole: 'client' | 'agency' = 'client'): Promise<ContentPost> {
    return this.request<ContentPost>(`/content/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify({ feedbackNote, authorName, authorRole }),
    });
  }

  async requestChanges(id: string, feedbackNote: string, authorName = 'Client Representative', authorRole: 'client' | 'agency' = 'client'): Promise<ContentPost> {
    return this.request<ContentPost>(`/content/${id}/request-changes`, {
      method: 'POST',
      body: JSON.stringify({ feedbackNote, authorName, authorRole }),
    });
  }

  async addComment(id: string, text: string, author: string, authorRole: 'client' | 'agency'): Promise<PostComment> {
    return this.request<PostComment>(`/content/${id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text, author, authorRole }),
    });
  }

  async deletePost(id: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/content/${id}`, {
      method: 'DELETE',
    });
  }

  // --- Analytics ---
  async getAnalytics(clientId?: string): Promise<AnalyticsData> {
    const endpoint = clientId ? `/analytics?clientId=${clientId}` : '/analytics';
    return this.request<AnalyticsData>(endpoint);
  }

  async getExecutiveSummary(clientId: string) {
    return this.request(`/analytics/${clientId}/summary`);
  }

  // --- Milestones ---
  async getMilestones(clientId?: string): Promise<ProjectMilestone[]> {
    const endpoint = clientId ? `/milestones?clientId=${clientId}` : '/milestones';
    return this.request<ProjectMilestone[]>(endpoint);
  }

  async createMilestone(milestone: Omit<ProjectMilestone, 'id'>): Promise<ProjectMilestone> {
    return this.request<ProjectMilestone>('/milestones', {
      method: 'POST',
      body: JSON.stringify(milestone),
    });
  }

  async toggleTask(milestoneId: string, taskId: string): Promise<ProjectMilestone> {
    return this.request<ProjectMilestone>(`/milestones/${milestoneId}/tasks/${taskId}/toggle`, {
      method: 'POST',
    });
  }

  // --- Service Requests ---
  async getRequests(status?: RequestStatus): Promise<ServiceRequest[]> {
    const endpoint = status ? `/requests?status=${status}` : '/requests';
    return this.request<ServiceRequest[]>(endpoint);
  }

  async submitRequest(request: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>): Promise<ServiceRequest> {
    return this.request<ServiceRequest>('/requests', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async updateRequestStatus(id: string, status: RequestStatus): Promise<ServiceRequest> {
    return this.request<ServiceRequest>(`/requests/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // --- AI Generator ---
  async generateAiContent(params: {
    topic: string;
    platform: SocialPlatform;
    tone?: string;
    targetAudience?: string;
    cta?: string;
  }) {
    return this.request<{
      title: string;
      caption: string;
      hashtags: string[];
      hookStrategy: string;
      suggestedMediaType: 'image' | 'video' | 'carousel';
    }>('/ai/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
}

export const apiClient = new ApiClient();
