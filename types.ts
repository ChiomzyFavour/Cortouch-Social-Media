

export type SocialPlatform =
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'youtube'
  | 'x'
  | 'facebook';

export type ServiceCategory =
  | 'management'
  | 'content'
  | 'ads'
  | 'influencer'
  | 'strategy';

export interface ServicePackage {
  id: string;
  category: ServiceCategory;
  name: string;
  tagline: string;
  priceMonthly: number;
  featured?: boolean;
  deliverables: string[];
  bestFor: string;
  turnaroundTime: string;
  iconName: string;
}

export type RequestStatus =
  | 'pending'
  | 'reviewed'
  | 'proposal_sent'
  | 'approved'
  | 'active';

export interface ServiceRequest {
  id: string;
  clientName: string;
  companyName: string;
  email: string;
  phone?: string;
  website?: string;
  platforms: SocialPlatform[];
  services: string[];
  monthlyBudget: string;
  goals: string[];
  targetAudience: string;
  preferredStartDate: string;
  notes?: string;
  status: RequestStatus;
  createdAt: string;
  estimatedQuoteMonthly: number;
}

export type PostStatus =
  | 'pending_approval'
  | 'approved'
  | 'changes_requested'
  | 'scheduled'
  | 'published';

export interface PostComment {
  id: string;
  author: string;
  authorRole: 'client' | 'agency';
  text: string;
  timestamp: string;
}

export interface PostMetrics {
  impressions: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
}

export interface ContentPost {
  id: string;
  clientId: string;
  clientName: string;
  platform: SocialPlatform;
  title: string;
  caption: string;
  hashtags: string[];
  mediaType: 'image' | 'video' | 'carousel';
  mediaUrls: string[];
  scheduledDate: string;
  status: PostStatus;
  author: string;
  version: number;
  comments: PostComment[];
  feedbackNotes?: string;
  metrics?: PostMetrics;
}

export interface PlatformStats {
  followers: number;
  followersGrowth: number;
  reach: number;
  reachGrowth: number;
  engagementRate: number;
  engagementGrowth: number;
  postsCount: number;
}

export interface HistoryDataPoint {
  date: string;
  label: string;
  reach: number;
  impressions: number;
  engagement: number;
  clicks: number;
}

export interface StrategicInsight {
  id: string;
  type: 'positive' | 'opportunity' | 'action';
  title: string;
  description: string;
  impact: string;
}

export interface AnalyticsData {
  clientId: string;
  period: string;
  totalFollowers: number;
  followersGrowth: number;
  totalReach: number;
  reachGrowth: number;
  avgEngagementRate: number;
  engagementGrowth: number;
  totalImpressions: number;
  impressionsGrowth: number;
  platforms: Partial<Record<SocialPlatform, PlatformStats>>;
  history: HistoryDataPoint[];
  strategicInsights: StrategicInsight[];
}

export type MilestoneStatus =
  | 'completed'
  | 'in_progress'
  | 'upcoming'
  | 'delayed';

export interface MilestoneTask {
  id: string;
  title: string;
  done: boolean;
}

export interface ProjectMilestone {
  id: string;
  clientId: string;
  phase: string;
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: MilestoneStatus;
  progress: number;
  owner: string;
  category: 'strategy' | 'production' | 'approval' | 'campaign' | 'reporting';
  tasks: MilestoneTask[];
}

export interface ClientProfile {
  id: string;
  name: string;
  industry: string;
  avatar: string;
  accentColor: string;
  primaryContact: string;
  contactEmail: string;
  activePlan: string;
  onboardingDate: string;
  activePlatforms: SocialPlatform[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'agency' | 'client' | 'admin';
  clientId?: string;
  companyName?: string;
  avatar?: string;
  passwordHash?: string;
  createdAt?: string;
}
export interface AIContentGenerationRequest {
  topic: string;
  platform: SocialPlatform;
  tone?: string;
  targetAudience?: string;
  cta?: string;
}

export interface AIContentGenerationResponse {
  title: string;
  caption: string;
  hashtags: string[];
  hookStrategy: string;
  suggestedMediaType: 'video' | 'carousel' | 'image';
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
   timestamp?: string;
     count?: number;  
}
export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
  code?: string;
  details?: unknown;
  timestamp?: string;
}