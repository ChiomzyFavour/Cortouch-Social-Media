import type { SocialPlatform, RequestStatus } from '../../../types/index.js'; // 👈 Added .js

export class CreateRequestDto {
  clientName!: string;
  companyName!: string;
  email!: string;
  phone?: string;
  website?: string;
  platforms!: SocialPlatform[];
  services!: string[];
  monthlyBudget!: string;
  goals!: string[];
  targetAudience!: string;
  preferredStartDate!: string;
  notes?: string;
}

export class UpdateRequestStatusDto {
  status!: RequestStatus;
}