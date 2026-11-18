import type { SocialPlatform, PostStatus } from '../../../types.js';

export class CreatePostDto {
  clientId!: string;
  clientName!: string;
  platform!: SocialPlatform;
  title!: string;
  caption!: string;
  hashtags?: string[];
  mediaType!: 'image' | 'video' | 'carousel';
  mediaUrls!: string[];
  scheduledDate!: string;
  author!: string;
  status?: PostStatus;
  feedbackNotes?: string;
}
