import { db } from '../data/store';
import { ContentPost, PostStatus, SocialPlatform, PostComment } from '../types';

export class ContentService {
  getPosts(filters?: { clientId?: string; status?: PostStatus; platform?: SocialPlatform }): ContentPost[] {
    return db.getPosts(filters);
  }

  getPostById(id: string): ContentPost | undefined {
    return db.getPostById(id);
  }

  createDraft(postData: Omit<ContentPost, 'id' | 'comments' | 'version' | 'status'>): ContentPost {
    return db.createPost(postData);
  }

  approvePost(id: string, feedbackNote?: string, authorName = 'Client Representative', role: 'client' | 'agency' = 'client'): ContentPost | null {
    return db.approvePost(id, feedbackNote, authorName, role);
  }

  requestChanges(id: string, feedbackNote: string, authorName = 'Client Representative', role: 'client' | 'agency' = 'client'): ContentPost | null {
    return db.requestPostChanges(id, feedbackNote, authorName, role);
  }

  addComment(postId: string, text: string, author: string, authorRole: 'client' | 'agency'): PostComment | null {
    return db.addPostComment(postId, text, author, authorRole);
  }

  updatePost(id: string, updates: Partial<ContentPost>): ContentPost | null {
    return db.updatePost(id, updates);
  }

  deletePost(id: string): boolean {
    return db.deletePost(id);
  }

  getPendingApprovalsCount(clientId?: string): number {
    const posts = db.getPosts(clientId ? { clientId } : undefined);
    return posts.filter(p => p.status === 'pending_approval').length;
  }
}

export const contentService = new ContentService();
