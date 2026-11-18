import type { SocialPlatform } from '../../../types/index.js'; // 👈 Added .js

export class UpdateClientDto {
  name?: string;
  industry?: string;
  avatar?: string;
  accentColor?: string;
  primaryContact?: string;
  contactEmail?: string;
  activePlan?: string;
  activePlatforms?: SocialPlatform[];
}