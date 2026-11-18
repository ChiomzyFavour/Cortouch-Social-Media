import type { SocialPlatform } from '../../../types/index.js'; // 👈 Added .js

export class GeneratePostDto {
  topic!: string;
  platform!: SocialPlatform;
  tone?: 'authoritative' | 'casual' | 'viral' | 'inspirational' | 'luxurious';
  targetAudience?: string;
  cta?: string;
}