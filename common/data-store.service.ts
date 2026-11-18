import { Injectable } from '@nestjs/common';
import { db, DataStore } from '../data/store.js'; // 👈 Added .js

type ContentPost = NonNullable<ReturnType<DataStore['getPostById']>>;
type ClientProfile = NonNullable<ReturnType<DataStore['getClientById']>>;
type ServicePackage = NonNullable<ReturnType<DataStore['getPackageById']>>;
type AnalyticsData = ReturnType<DataStore['getAnalytics']>;
type ProjectMilestone = NonNullable<ReturnType<DataStore['getMilestoneById']>>;
type ServiceRequest = NonNullable<ReturnType<DataStore['getRequestById']>>;
type RequestStatus = Parameters<DataStore['updateRequestStatus']>[1];
type PostStatus = NonNullable<NonNullable<Parameters<DataStore['getPosts']>[0]>['status']>;
type SocialPlatform = NonNullable<NonNullable<Parameters<DataStore['getPosts']>[0]>['platform']>;
type PostComment = NonNullable<ReturnType<DataStore['addPostComment']>>;
type User = NonNullable<ReturnType<DataStore['findUserById']>>;
type StoredUser = NonNullable<ReturnType<DataStore['findUserByEmail']>>;

@Injectable()
export class DataStoreService {
  private readonly store: DataStore = db;

  // --- Clients & Packages ---
  getClients(): ClientProfile[] {
    return this.store.getClients();
  }

  getClientById(id: string): ClientProfile | undefined {
    return this.store.getClientById(id);
  }

  updateClient(id: string, updates: Partial<ClientProfile>): ClientProfile | null {
    return this.store.updateClient(id, updates);
  }

  getPackages(): ServicePackage[] {
    return this.store.getPackages();
  }

  getPackageById(id: string): ServicePackage | undefined {
    return this.store.getPackageById(id);
  }

  // --- Content Posts ---
  getPosts(filters?: { clientId?: string; status?: PostStatus; platform?: SocialPlatform }): ContentPost[] {
    return this.store.getPosts(filters);
  }

  getPostById(id: string): ContentPost | undefined {
    return this.store.getPostById(id);
  }

  createPost(data: Omit<ContentPost, 'id' | 'version' | 'comments'>): ContentPost {
    return this.store.createPost(data);
  }

  updatePost(id: string, updates: Partial<ContentPost>): ContentPost | null {
    return this.store.updatePost(id, updates);
  }

  approvePost(
    id: string,
    feedbackNote?: string,
    authorName = 'Client Representative',
    role: 'client' | 'agency' = 'client',
  ): ContentPost | null {
    return this.store.approvePost(id, feedbackNote, authorName, role);
  }

  requestPostChanges(
    id: string,
    feedbackNote: string,
    authorName = 'Client Representative',
    role: 'client' | 'agency' = 'client',
  ): ContentPost | null {
    return this.store.requestPostChanges(id, feedbackNote, authorName, role);
  }

  addPostComment(
    postId: string,
    text: string,
    author: string,
    authorRole: 'client' | 'agency',
  ): PostComment | null {
    return this.store.addPostComment(postId, text, author, authorRole);
  }

  deletePost(id: string): boolean {
    return this.store.deletePost(id);
  }

  // --- Analytics ---
  getAnalytics(clientId?: string): AnalyticsData {
    return this.store.getAnalytics(clientId);
  }

  // --- Milestones ---
  getMilestones(clientId?: string): ProjectMilestone[] {
    return this.store.getMilestones(clientId);
  }

  getMilestoneById(id: string): ProjectMilestone | undefined {
    return this.store.getMilestoneById(id);
  }

  createMilestone(data: Omit<ProjectMilestone, 'id'>): ProjectMilestone {
    return this.store.createMilestone(data);
  }

  updateMilestone(id: string, updates: Partial<ProjectMilestone>): ProjectMilestone | null {
    return this.store.updateMilestone(id, updates);
  }

  toggleMilestoneTask(milestoneId: string, taskId: string): ProjectMilestone | null {
    return this.store.toggleMilestoneTask(milestoneId, taskId);
  }

  // --- Requests ---
  getRequests(status?: RequestStatus): ServiceRequest[] {
    return this.store.getRequests(status);
  }

  getRequestById(id: string): ServiceRequest | undefined {
    return this.store.getRequestById(id);
  }

  createRequest(data: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>): ServiceRequest {
    return this.store.createRequest(data);
  }

  updateRequestStatus(id: string, status: RequestStatus): ServiceRequest | null {
    return this.store.updateRequestStatus(id, status);
  }

  // --- Users & Auth ---
  findUserByEmail(email: string): StoredUser | undefined {
    return this.store.findUserByEmail(email);
  }

  findUserById(id: string): User | undefined {
    return this.store.findUserById(id);
  }

  createUser(userData: Omit<User, 'id' | 'createdAt'>, passwordHash: string): User {
    return this.store.createUser(userData, passwordHash);
  }

  getUsers(): User[] {
    return this.store.getUsers();
  }

  getDemoAccounts() {
    return this.store.getDemoAccounts();
  }
}