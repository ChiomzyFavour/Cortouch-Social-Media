import type { SocialPlatform, PostStatus } from '../../../types.js';

export class UpdatePostDto {
  title?: string;
  caption?: string;
  hashtags?: string[];
  platform?: SocialPlatform;
  mediaType?: 'image' | 'video' | 'carousel';
  mediaUrls?: string[];
  scheduledDate?: string;
  status?: PostStatus;
  feedbackNotes?: string;
}
