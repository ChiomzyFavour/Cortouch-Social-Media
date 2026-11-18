import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { DataStoreService } from '../../common/data-store.service.js'; // 👈 Added .js
import { ContentPost, PostStatus, SocialPlatform, PostComment } from '../../types/index.js'; // 👈 Added .js (or ../../types.js)
import { CreatePostDto } from './dto/create-post.dto.js'; // 👈 Added .js
import { UpdatePostDto } from './dto/update-post.dto.js'; // 👈 Added .js
import { ApprovePostDto, RequestChangesDto, AddCommentDto } from './dto/post-action.dto.js'; // 👈 Added .js

@Injectable()
export class ContentService {
  constructor(@Inject(DataStoreService) private readonly dataStore: DataStoreService) {}

  getAllPosts(filters?: { clientId?: string; status?: PostStatus; platform?: SocialPlatform }): ContentPost[] {
    return this.dataStore.getPosts(filters);
  }

  getPostById(id: string): ContentPost {
    const post = this.dataStore.getPostById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" was not found`);
    }
    return post;
  }

  createPost(dto: CreatePostDto): ContentPost {
    if (!dto.title || !dto.clientId || !dto.platform) {
      throw new BadRequestException('Missing required fields: title, clientId, and platform are mandatory');
    }

    return this.dataStore.createPost({
      clientId: dto.clientId,
      clientName: dto.clientName || 'Cortouch Client',
      platform: dto.platform,
      title: dto.title,
      caption: dto.caption || '',
      hashtags: dto.hashtags || [],
      mediaType: dto.mediaType || 'image',
      mediaUrls: dto.mediaUrls && dto.mediaUrls.length > 0 ? dto.mediaUrls : ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'],
      scheduledDate: dto.scheduledDate || new Date().toISOString(),
      status: dto.status || 'pending_approval',
      author: dto.author || 'Cortouch Team',
      feedbackNotes: dto.feedbackNotes,
    });
  }

  updatePost(id: string, dto: UpdatePostDto): ContentPost {
    this.getPostById(id); // Throws 404 if not found
    const updated = this.dataStore.updatePost(id, dto);
    if (!updated) {
      throw new NotFoundException(`Post with ID "${id}" was not found`);
    }
    return updated;
  }

  approvePost(id: string, dto: ApprovePostDto): ContentPost {
    this.getPostById(id);
    const approved = this.dataStore.approvePost(
      id,
      dto.feedbackNote,
      dto.authorName || 'Client Representative',
      dto.role || 'client',
    );
    if (!approved) {
      throw new NotFoundException(`Post with ID "${id}" could not be approved`);
    }
    return approved;
  }

  requestChanges(id: string, dto: RequestChangesDto): ContentPost {
    this.getPostById(id);
    if (!dto.feedbackNote || !dto.feedbackNote.trim()) {
      throw new BadRequestException('Feedback notes are required when requesting changes');
    }
    const updated = this.dataStore.requestPostChanges(
      id,
      dto.feedbackNote,
      dto.authorName || 'Client Representative',
      dto.role || 'client',
    );
    if (!updated) {
      throw new NotFoundException(`Post with ID "${id}" could not be updated`);
    }
    return updated;
  }

  addComment(id: string, dto: AddCommentDto): PostComment {
    this.getPostById(id);
    if (!dto.text || !dto.text.trim()) {
      throw new BadRequestException('Comment text is required');
    }
    const comment = this.dataStore.addPostComment(
      id,
      dto.text,
      dto.author || 'User',
      dto.authorRole || 'client',
    );
    if (!comment) {
      throw new BadRequestException('Could not append comment to post');
    }
    return comment;
  }

  deletePost(id: string): { success: boolean; message: string } {
    const post = this.dataStore.getPostById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" was not found`);
    }
    const deleted = this.dataStore.deletePost(id);
    return {
      success: deleted,
      message: `Post "${post.title}" deleted successfully`,
    };
  }
}