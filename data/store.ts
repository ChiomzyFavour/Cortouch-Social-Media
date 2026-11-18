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
} from '../types/index.js';

export const INITIAL_SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'growth-starter',
    category: 'management',
    name: 'Growth Catalyst',
    tagline: 'Essential social presence and community nurturing for emerging brands.',
    priceMonthly: 1850,
    deliverables: [
      '12 Curated posts per month (Reels + Static + Carousels)',
      'Instagram & LinkedIn management',
      'Community engagement (1 hr daily response)',
      'Monthly performance analytics review',
      'Hashtag & SEO audio keyword research',
    ],
    bestFor: 'Seed-stage startups & boutique lifestyle brands',
    turnaroundTime: '48h content approvals',
    iconName: 'Sparkles',
  },
  {
    id: 'omnichannel-scale',
    category: 'management',
    name: 'Omnichannel Velocity',
    tagline: 'High-frequency creative engine across 4 key social channels.',
    priceMonthly: 3600,
    featured: true,
    deliverables: [
      '24 High-impact content pieces per month',
      'Instagram, TikTok, LinkedIn & YouTube Shorts',
      'Dedicated creative director & video editor',
      'Bi-weekly content approval batching',
      'Proactive trend-jacking & sound licensing',
      'Weekly real-time analytics reports',
      'Meta / TikTok Paid ad creative testing (up to $5k ad spend mgmt)',
    ],
    bestFor: 'Scaling D2C brands, venture-backed companies, modern retailers',
    turnaroundTime: '24h revision turnaround',
    iconName: 'Flame',
  },
  {
    id: 'viral-shortform',
    category: 'content',
    name: 'Short-Form Video Lab',
    tagline: 'On-site or studio shoot days converted into viral TikToks & Reels.',
    priceMonthly: 2800,
    deliverables: [
      '16 Bespoke edited Reels / TikToks per month',
      'Custom scripted hooks & high-retention editing',
      'Captions, sound design, sound fx & dynamic subtitles',
      'Raw footage archiving & creative asset vault',
      '1 Full-day on-location quarterly studio shoot',
    ],
    bestFor: 'Brands looking for algorithmic reach and viral discovery',
    turnaroundTime: '72h turnaround on batch edits',
    iconName: 'Video',
  },
  {
    id: 'performance-ads',
    category: 'ads',
    name: 'Paid Social Performance',
    tagline: 'Data-driven UGC and motion ad funnels engineered for maximum ROAS.',
    priceMonthly: 2400,
    deliverables: [
      'Meta (IG/FB) & TikTok ad account management',
      '8 New ad variations / iterations produced monthly',
      'Full funnel retargeting & audience segmentation',
      'Daily ROAS & CPA optimization',
      'Custom conversion tracking & pixel audit',
    ],
    bestFor: 'E-commerce and SaaS brands scaling monthly revenue',
    turnaroundTime: 'Real-time dashboard tracking',
    iconName: 'TrendingUp',
  },
  {
    id: 'executive-brand',
    category: 'strategy',
    name: 'Executive & Founder Voice',
    tagline: 'Turn C-suite founders into authoritative industry keynote leaders.',
    priceMonthly: 2200,
    deliverables: [
      '8 In-depth ghostwritten LinkedIn thought leadership essays',
      'Twitter/X threads & newsletter cross-posting',
      'PR pitch hooks and podcast booking synergy',
      'Bi-weekly strategic voice alignment calls',
    ],
    bestFor: 'CEOs, venture partners, and visionary creators',
    turnaroundTime: 'Weekly batch review',
    iconName: 'Crown',
  },
];

export const INITIAL_CLIENT_PROFILES: ClientProfile[] = [
  {
    id: 'client-1',
    name: 'Luxe Atelier Studios',
    industry: 'High Fashion & Sustainable Luxury',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    accentColor: '#ec4899',
    primaryContact: 'Elena Rostova',
    contactEmail: 'elena@luxeatelier.design',
    activePlan: 'Omnichannel Velocity ($3,600/mo)',
    onboardingDate: 'April 2026',
    activePlatforms: ['instagram', 'tiktok', 'linkedin'],
  },
  {
    id: 'client-2',
    name: 'Apex AI Systems',
    industry: 'Enterprise B2B SaaS',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    accentColor: '#3b82f6',
    primaryContact: 'Marcus Vance',
    contactEmail: 'marcus@apexsyst.io',
    activePlan: 'Executive & Founder Voice ($2,200/mo)',
    onboardingDate: 'January 2026',
    activePlatforms: ['linkedin', 'x', 'youtube'],
  },
  {
    id: 'client-3',
    name: 'Pulse Botanicals',
    industry: 'Functional Beverage & Wellness',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    accentColor: '#10b981',
    primaryContact: 'Chloe Tan',
    contactEmail: 'chloe@pulsebotanicals.co',
    activePlan: 'Short-Form Video Lab ($2,800/mo)',
    onboardingDate: 'May 2026',
    activePlatforms: ['tiktok', 'instagram'],
  },
];

export const INITIAL_POSTS: ContentPost[] = [
  {
    id: 'post-1',
    clientId: 'client-1',
    clientName: 'Luxe Atelier Studios',
    platform: 'instagram',
    title: 'Fall 2026 Heritage Silk Collection Teaser',
    caption: 'Pure silk, consciously woven. Introducing our Autumn Capsule where traditional Milanese handcraft meets zero-waste modern geometry. ✨ Drop 01 lands this Friday at 10 AM EST. Tap link in bio to reserve your early VIP access before general public release.',
    hashtags: ['#LuxeAtelier', '#SustainableFashion', '#MilanFashion', '#SilkElegance', '#SlowFashionMovement'],
    mediaType: 'video',
    mediaUrls: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
    ],
    scheduledDate: '2026-09-08 11:30 AM',
    status: 'pending_approval',
    author: 'Cortouch Creative Lead (Sarah M.)',
    version: 1,
    feedbackNotes: 'Please review audio hook timing at second 0:03.',
    comments: [
      {
        id: 'c-1',
        author: 'Sarah M. (Cortouch Lead)',
        authorRole: 'agency',
        text: 'Elena, we paired this with the trending orchestral synth sound. Expected engagement rate is ~6.2%. Let us know if the early access CTA matches your Shopify rollout!',
        timestamp: 'Today at 09:15 AM',
      },
    ],
  },
  {
    id: 'post-2',
    clientId: 'client-1',
    clientName: 'Luxe Atelier Studios',
    platform: 'tiktok',
    title: 'Behind the Seams: Zero Waste Tailoring Process',
    caption: 'How we turn 0.0% scraps into bespoke silk scrunchies and pocket squares. Watch our master artisan Marco reconstruct leftover fibers! 🧵 #FashionTok #DesignHacks',
    hashtags: ['#BehindTheScenes', '#ArtisanMade', '#ZeroWasteCraft', '#StudioVlog'],
    mediaType: 'video',
    mediaUrls: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
    ],
    scheduledDate: '2026-09-10 03:00 PM',
    status: 'approved',
    author: 'Cortouch Video Specialist (Dave K.)',
    version: 2,
    feedbackNotes: 'Revision 2: Added on-screen dynamic subtitles as requested.',
    comments: [
      {
        id: 'c-2a',
        author: 'Elena Rostova (Client)',
        authorRole: 'client',
        text: 'Love the pacing! Could we add captions for the cutting sound at 0:12?',
        timestamp: 'Yesterday at 04:30 PM',
      },
      {
        id: 'c-2b',
        author: 'Dave K. (Cortouch)',
        authorRole: 'agency',
        text: 'Updated in v2! Added crisp subtitles and adjusted EQ for maximum punch.',
        timestamp: 'Yesterday at 06:10 PM',
      },
      {
        id: 'c-2c',
        author: 'Elena Rostova (Client)',
        authorRole: 'client',
        text: 'Green light! Approved for scheduling.',
        timestamp: 'Today at 08:00 AM',
      },
    ],
  },
  {
    id: 'post-3',
    clientId: 'client-1',
    clientName: 'Luxe Atelier Studios',
    platform: 'linkedin',
    title: 'The Circular Fashion Economics Manifesto',
    caption: 'The future of luxury isn’t scarcity—it is closed-loop accountability. In our Q3 Impact Report, we reveal how Luxe Atelier achieved carbon-negative transit across 14 European distributors while boosting customer LTV by 38%.\n\nRead our founder Elena Rostova’s full case breakdown below.',
    hashtags: ['#CircularEconomy', '#SustainableLuxury', '#RetailInnovation', '#Leadership'],
    mediaType: 'carousel',
    mediaUrls: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
    ],
    scheduledDate: '2026-09-12 09:00 AM',
    status: 'pending_approval',
    author: 'Cortouch Strategy Director (Alex R.)',
    version: 1,
    comments: [],
  },
  {
    id: 'post-4',
    clientId: 'client-1',
    clientName: 'Luxe Atelier Studios',
    platform: 'instagram',
    title: 'Client Spotlight: Archival Velvet Trench Coat',
    caption: 'Timeless silhouettes worn by visionary architect Clara Moreau in Berlin. Structured shoulders, fluid drape, water-repellent organic cotton velvet.',
    hashtags: ['#LuxeAtelier', '#BerlinStyle', '#ArchitecturalFashion'],
    mediaType: 'image',
    mediaUrls: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    ],
    scheduledDate: '2026-09-02 02:00 PM',
    status: 'published',
    author: 'Sarah M. (Cortouch Lead)',
    version: 1,
    comments: [],
    metrics: {
      impressions: 48920,
      reach: 39410,
      likes: 3120,
      comments: 184,
      shares: 412,
      saves: 890,
      clicks: 640,
    },
  },
  {
    id: 'post-5',
    clientId: 'client-2',
    clientName: 'Apex AI Systems',
    platform: 'linkedin',
    title: 'Why 70% of LLM Deployments Stall in Production',
    caption: 'Most teams optimize for benchmark perplexity. Top enterprise engineering teams optimize for deterministic deterministic rollback windows and cache locality.\n\nHere are 3 architectural mistakes we see Fortune 500 AI platforms make:',
    hashtags: ['#ArtificialIntelligence', '#EngineeringLeadership', '#LLMOps', '#CloudArchitecture'],
    mediaType: 'carousel',
    mediaUrls: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    ],
    scheduledDate: '2026-09-09 10:00 AM',
    status: 'pending_approval',
    author: 'Cortouch Tech Strategist (Marcus P.)',
    version: 1,
    comments: [],
  },
];

export const INITIAL_ANALYTICS: Record<string, AnalyticsData> = {
  'client-1': {
    clientId: 'client-1',
    period: 'September 2026 (Live 30-Day)',
    totalFollowers: 142800,
    followersGrowth: 14.8,
    totalReach: 894300,
    reachGrowth: 28.4,
    avgEngagementRate: 5.7,
    engagementGrowth: 1.2,
    totalImpressions: 1420900,
    impressionsGrowth: 32.1,
    platforms: {
      instagram: {
        followers: 84600,
        followersGrowth: 12.3,
        reach: 489000,
        reachGrowth: 24.5,
        engagementRate: 6.1,
        engagementGrowth: 0.9,
        postsCount: 16,
      },
      tiktok: {
        followers: 41200,
        followersGrowth: 31.8,
        reach: 318000,
        reachGrowth: 46.2,
        engagementRate: 8.4,
        engagementGrowth: 2.1,
        postsCount: 12,
      },
      linkedin: {
        followers: 17000,
        followersGrowth: 8.5,
        reach: 87300,
        reachGrowth: 11.2,
        engagementRate: 3.8,
        engagementGrowth: 0.4,
        postsCount: 8,
      },
    },
    history: [
      { date: '2026-08-01', label: 'W1 Aug', reach: 142000, impressions: 210000, engagement: 8200, clicks: 2100 },
      { date: '2026-08-08', label: 'W2 Aug', reach: 168000, impressions: 248000, engagement: 10400, clicks: 2650 },
      { date: '2026-08-15', label: 'W3 Aug', reach: 195000, impressions: 295000, engagement: 12100, clicks: 3100 },
      { date: '2026-08-22', label: 'W4 Aug', reach: 210000, impressions: 320000, engagement: 13900, clicks: 3500 },
      { date: '2026-08-29', label: 'W1 Sep', reach: 245000, impressions: 380000, engagement: 16200, clicks: 4200 },
      { date: '2026-09-05', label: 'W2 Sep', reach: 284000, impressions: 440000, engagement: 19800, clicks: 5100 },
    ],
    strategicInsights: [
      {
        id: 'in-1',
        type: 'positive',
        title: 'Short-Form Reels Outperforming Benchmarks',
        description: 'Studio BTS Reels delivered 3.4x average saves compared to static lifestyle photography, expanding non-follower discovery by 41%.',
        impact: '+41% Top-of-Funnel Discovery',
      },
      {
        id: 'in-2',
        type: 'opportunity',
        title: 'LinkedIn Thought Leadership Untapped Window',
        description: 'Elena’s sustainability essay produced 18 qualified inbound DM inquiries from boutique European retailers. Increasing cadence to 2x weekly is recommended.',
        impact: 'High-Value B2B Wholesale Pipeline',
      },
      {
        id: 'in-3',
        type: 'action',
        title: 'Friday Morning Drop Window Optimization',
        description: 'Audience activity peaks at 11:30 AM EST on Thursdays & Fridays. Shifting the Capsule Drop announcement forward by 90 minutes will capture peak lunch scroll traffic.',
        impact: 'Estimated +18% First-Hour CTR',
      },
    ],
  },
  'client-2': {
    clientId: 'client-2',
    period: 'September 2026 (Live 30-Day)',
    totalFollowers: 38900,
    followersGrowth: 18.2,
    totalReach: 245000,
    reachGrowth: 22.0,
    avgEngagementRate: 4.4,
    engagementGrowth: 0.8,
    totalImpressions: 489000,
    impressionsGrowth: 26.5,
    platforms: {
      linkedin: {
        followers: 24500,
        followersGrowth: 19.5,
        reach: 165000,
        reachGrowth: 28.0,
        engagementRate: 5.1,
        engagementGrowth: 1.1,
        postsCount: 14,
      },
      x: {
        followers: 9800,
        followersGrowth: 14.1,
        reach: 52000,
        reachGrowth: 12.4,
        engagementRate: 3.2,
        engagementGrowth: 0.3,
        postsCount: 22,
      },
      youtube: {
        followers: 4600,
        followersGrowth: 22.8,
        reach: 28000,
        reachGrowth: 31.0,
        engagementRate: 6.8,
        engagementGrowth: 1.4,
        postsCount: 4,
      },
    },
    history: [
      { date: '2026-08-01', label: 'W1 Aug', reach: 38000, impressions: 72000, engagement: 2100, clicks: 680 },
      { date: '2026-08-08', label: 'W2 Aug', reach: 45000, impressions: 86000, engagement: 2600, clicks: 820 },
      { date: '2026-08-15', label: 'W3 Aug', reach: 51000, impressions: 98000, engagement: 3100, clicks: 950 },
      { date: '2026-08-22', label: 'W4 Aug', reach: 59000, impressions: 112000, engagement: 3800, clicks: 1140 },
      { date: '2026-08-29', label: 'W1 Sep', reach: 68000, impressions: 135000, engagement: 4600, clicks: 1400 },
      { date: '2026-09-05', label: 'W2 Sep', reach: 79000, impressions: 158000, engagement: 5400, clicks: 1720 },
    ],
    strategicInsights: [
      {
        id: 'in-201',
        type: 'positive',
        title: 'Architectural Teardowns Generating MQLs',
        description: 'Deep-dive carousel diagrams generated 12 enterprise demo requests directly from VP of Engineering profiles.',
        impact: 'Direct enterprise sales pipeline',
      },
    ],
  },
  'client-3': {
    clientId: 'client-3',
    period: 'September 2026 (Live 30-Day)',
    totalFollowers: 67300,
    followersGrowth: 26.4,
    totalReach: 540000,
    reachGrowth: 41.2,
    avgEngagementRate: 7.2,
    engagementGrowth: 1.9,
    totalImpressions: 980000,
    impressionsGrowth: 49.0,
    platforms: {
      tiktok: {
        followers: 48900,
        followersGrowth: 34.2,
        reach: 410000,
        reachGrowth: 54.0,
        engagementRate: 8.9,
        engagementGrowth: 2.4,
        postsCount: 18,
      },
      instagram: {
        followers: 18400,
        followersGrowth: 12.0,
        reach: 130000,
        reachGrowth: 18.5,
        engagementRate: 4.8,
        engagementGrowth: 0.8,
        postsCount: 10,
      },
    },
    history: [
      { date: '2026-08-01', label: 'W1 Aug', reach: 82000, impressions: 140000, engagement: 6100, clicks: 1800 },
      { date: '2026-08-08', label: 'W2 Aug', reach: 98000, impressions: 175000, engagement: 7400, clicks: 2200 },
      { date: '2026-08-15', label: 'W3 Aug', reach: 115000, impressions: 210000, engagement: 9100, clicks: 2750 },
      { date: '2026-08-22', label: 'W4 Aug', reach: 138000, impressions: 260000, engagement: 11400, clicks: 3400 },
      { date: '2026-08-29', label: 'W1 Sep', reach: 165000, impressions: 320000, engagement: 14200, clicks: 4200 },
      { date: '2026-09-05', label: 'W2 Sep', reach: 195000, impressions: 395000, engagement: 17800, clicks: 5300 },
    ],
    strategicInsights: [
      {
        id: 'in-301',
        type: 'positive',
        title: 'Micro-Influencer Tasting Duets Viral Spike',
        description: 'Taste-test reactions on TikTok triggered 3 consecutive viral clips topping 100k views each.',
        impact: '+84% direct DTC store referrals',
      },
    ],
  },
};

export const INITIAL_MILESTONES: ProjectMilestone[] = [
  {
    id: 'm-1',
    clientId: 'client-1',
    phase: 'Phase 1: Creative Brand Refresh & Onboarding',
    title: 'Visual Identity & Content Pillar Playbook',
    description: 'Establish high-contrast visual standards, typography overlays, color palettes, and the core 5 content pillars for autumn.',
    startDate: '2026-08-01',
    dueDate: '2026-08-18',
    status: 'completed',
    progress: 100,
    owner: 'Cortouch Brand Lead',
    category: 'strategy',
    tasks: [
      { id: 't1', title: 'Audit historical top 100 performing posts', done: true },
      { id: 't2', title: 'Assemble moodboards & visual aesthetic styleguide', done: true },
      { id: 't3', title: 'Define sound library & approved trending audio presets', done: true },
      { id: 't4', title: 'Present brand playbook to executive stakeholders', done: true },
    ],
  },
  {
    id: 'm-2',
    clientId: 'client-1',
    phase: 'Phase 2: Autumn Capsule Campaign',
    title: 'Heritage Silk Studio Production & Batch Edits',
    description: 'Execute high-fashion studio video shoot, master 16 short-form reels, color-grade raw clips, and compose dynamic captions.',
    startDate: '2026-08-20',
    dueDate: '2026-09-12',
    status: 'in_progress',
    progress: 75,
    owner: 'Cortouch Production Crew',
    category: 'production',
    tasks: [
      { id: 't5', title: 'On-location Milanese atelier video capture session', done: true },
      { id: 't6', title: 'Rough cuts & B-roll macro silk weave sequencing', done: true },
      { id: 't7', title: 'Batch sound design and dynamic subtitle burns', done: true },
      { id: 't8', title: 'Client final signoff on Batch #02 video masters', done: false },
    ],
  },
  {
    id: 'm-3',
    clientId: 'client-1',
    phase: 'Phase 2: Autumn Capsule Campaign',
    title: 'VIP Early-Access Launch & Paid Social Retargeting',
    description: 'Coordinate synchronized Instagram Stories VIP countdown, TikTok Spark ad boosting, and LinkedIn founder announcement.',
    startDate: '2026-09-13',
    dueDate: '2026-09-26',
    status: 'upcoming',
    progress: 15,
    owner: 'Cortouch Paid & Strategy Lead',
    category: 'campaign',
    tasks: [
      { id: 't9', title: 'Setup Meta custom audience segments & lookalikes', done: true },
      { id: 't10', title: 'Deploy VIP email & IG story sticker registration funnel', done: false },
      { id: 't11', title: 'Go-live Friday 10 AM drop monitor & community replies', done: false },
      { id: 't12', title: '48-hour ROAS & CPA performance calibration', done: false },
    ],
  },
  {
    id: 'm-4',
    clientId: 'client-1',
    phase: 'Phase 3: Q4 Scale & Holiday Pre-Season',
    title: 'Holiday Gift Guide Strategy & Micro-Creator Gifting',
    description: 'Curate roster of 35 European sustainable fashion tastemakers, seed bespoke monogrammed silk gift boxes, and schedule UGC.',
    startDate: '2026-09-28',
    dueDate: '2026-10-30',
    status: 'upcoming',
    progress: 0,
    owner: 'Cortouch Influencer Relations',
    category: 'strategy',
    tasks: [
      { id: 't13', title: 'Creator outreach & contractual deliverables signoff', done: false },
      { id: 't14', title: 'Package custom packaging & tracking coordination', done: false },
      { id: 't15', title: 'Consolidate incoming UGC raw video assets into vault', done: false },
      { id: 't16', title: 'Whitelisting & Spark Ads creator ad authorization', done: false },
    ],
  },
  {
    id: 'm-5',
    clientId: 'client-2',
    phase: 'Phase 1: Founder Positioning',
    title: 'C-Suite Technical Thought Leadership Engine',
    description: 'Produce high-converting bi-weekly architecture breakdowns on LinkedIn and X for enterprise CTO and VP Engineering discovery.',
    startDate: '2026-08-15',
    dueDate: '2026-09-30',
    status: 'in_progress',
    progress: 60,
    owner: 'Cortouch Ghostwriting Lead',
    category: 'strategy',
    tasks: [
      { id: 't201', title: 'Technical interview deep-dives with Marcus Vance', done: true },
      { id: 't202', title: 'Draft 6 technical breakdown threads & essays', done: true },
      { id: 't203', title: 'Custom architectural diagram visuals production', done: true },
      { id: 't204', title: 'Cross-syndication to Substack & HackerNews', done: false },
    ],
  },
];

export const INITIAL_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-101',
    clientName: 'Julian Sterling',
    companyName: 'Aura Sound Labs',
    email: 'julian@aurasoundlabs.com',
    phone: '+1 (555) 349-8812',
    website: 'https://aurasoundlabs.com',
    platforms: ['instagram', 'tiktok', 'youtube'],
    services: ['omnichannel-scale', 'viral-shortform'],
    monthlyBudget: '$5,000 - $10,000 / mo',
    goals: [
      'Launch upcoming Spatial Audio ANC headphones in Q4',
      'Generate 500k+ viral short-form views per month',
      'Build engaged community around audiophile lifestyle',
    ],
    targetAudience: 'Tech enthusiasts, sound designers, remote workers 22-38',
    preferredStartDate: '2026-10-01',
    notes: 'We have pristine 3D CAD renders ready and need creative storytelling and punchy hooks.',
    status: 'proposal_sent',
    createdAt: '2026-09-02',
    estimatedQuoteMonthly: 6400,
  },
  {
    id: 'req-102',
    clientName: 'Sienna Brooks',
    companyName: 'Equinox Living & Architecture',
    email: 'sienna@equinoxliving.co',
    phone: '+44 20 7946 0912',
    website: 'https://equinoxliving.co',
    platforms: ['instagram', 'linkedin'],
    services: ['growth-starter', 'executive-brand'],
    monthlyBudget: '$3,500 - $6,000 / mo',
    goals: [
      'Elevate founder profile in sustainable architectural design',
      'Attract high-net-worth residential development clients',
    ],
    targetAudience: 'HNW homeowners, real estate developers, interior designers',
    preferredStartDate: '2026-10-15',
    notes: 'Focus on minimal, brutalist aesthetics and editorial imagery.',
    status: 'reviewed',
    createdAt: '2026-09-03',
    estimatedQuoteMonthly: 4050,
  },
  {
    id: 'req-103',
    clientName: 'Tariq Al-Mansoor',
    companyName: 'Kite FinTech',
    email: 'tariq@kitefintech.io',
    website: 'https://kitefintech.io',
    platforms: ['linkedin', 'x'],
    services: ['executive-brand', 'performance-ads'],
    monthlyBudget: '$5,000 - $8,000 / mo',
    goals: [
      'Build trust for Series-A fintech treasury automation platform',
      'Acquire CFO and Treasurer demo signups with sub-$180 CPA',
    ],
    targetAudience: 'Chief Financial Officers and corporate treasury directors',
    preferredStartDate: '2026-09-20',
    notes: 'Regulatory compliance review is required for all outbound copy.',
    status: 'pending',
    createdAt: '2026-09-04',
    estimatedQuoteMonthly: 4600,
  },
];

/**
 * In-memory Store Class providing persistent operations across the backend server
 */
export class DataStore {
  private packages: ServicePackage[] = [...INITIAL_SERVICE_PACKAGES];
  private clients: ClientProfile[] = [...INITIAL_CLIENT_PROFILES];
  private posts: ContentPost[] = [...INITIAL_POSTS];
  private analytics: Record<string, AnalyticsData> = { ...INITIAL_ANALYTICS };
  private milestones: ProjectMilestone[] = [...INITIAL_MILESTONES];
  private requests: ServiceRequest[] = [...INITIAL_SERVICE_REQUESTS];
    private users: User[] = [
    {
      id: 'user-1',
      email: 'elena@luxeatelier.design',
      name: 'Elena Rostova',
      role: 'client',
      clientId: 'client-1',
      companyName: 'Luxe Atelier Studios',
      passwordHash: 'dummy_hash_1',
      createdAt: '2026-04-01',
    },
    {
      id: 'user-2',
      email: 'admin@cortouch.agency',
      name: 'Cortouch Admin',
      role: 'agency',
      companyName: 'Cortouch Agency',
      passwordHash: 'dummy_hash_2',
      createdAt: '2026-01-01',
    }
  ];

  // --- Packages ---
  getPackages(): ServicePackage[] {
    return [...this.packages];
  }

  getPackageById(id: string): ServicePackage | undefined {
    return this.packages.find(p => p.id === id);
  }

  // --- Clients ---
  getClients(): ClientProfile[] {
    return [...this.clients];
  }

  getClientById(id: string): ClientProfile | undefined {
    return this.clients.find(c => c.id === id);
  }

  // --- Posts ---
  getPosts(filters?: { clientId?: string; status?: PostStatus; platform?: SocialPlatform }): ContentPost[] {
    let result = [...this.posts];
    if (filters?.clientId) {
      result = result.filter(p => p.clientId === filters.clientId);
    }
    if (filters?.status) {
      result = result.filter(p => p.status === filters.status);
    }
    if (filters?.platform) {
      result = result.filter(p => p.platform === filters.platform);
    }
    return result.sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime());
  }

  getPostById(id: string): ContentPost | undefined {
    return this.posts.find(p => p.id === id);
  }

  createPost(newPostData: Omit<ContentPost, 'id' | 'comments' | 'version' | 'status'>): ContentPost {
    const post: ContentPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      status: 'pending_approval',
      version: 1,
      comments: [
        {
          id: `c-${Date.now()}`,
          author: 'Cortouch Creative Lead',
          authorRole: 'agency',
          text: 'New draft submitted for review and approval.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };
    this.posts.unshift(post);
    return post;
  }

  updatePost(id: string, updates: Partial<ContentPost>): ContentPost | null {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.posts[index] = { ...this.posts[index], ...updates };
    return this.posts[index];
  }

  approvePost(id: string, feedbackNote?: string, authorName = 'Client Representative', role: 'client' | 'agency' = 'client'): ContentPost | null {
    const post = this.posts.find(p => p.id === id);
    if (!post) return null;

    const newComments = [...post.comments];
    if (feedbackNote) {
      newComments.push({
        id: `c-${Date.now()}`,
        author: authorName,
        authorRole: role,
        text: `[Approved]: ${feedbackNote}`,
        timestamp: 'Just now',
      });
    }

    post.status = 'approved';
    post.feedbackNotes = feedbackNote || 'Approved for scheduling';
    post.comments = newComments;
    return post;
  }

  requestPostChanges(id: string, feedbackNote: string, authorName = 'Client Representative', role: 'client' | 'agency' = 'client'): ContentPost | null {
    const post = this.posts.find(p => p.id === id);
    if (!post) return null;

    const newComments = [
      ...post.comments,
      {
        id: `c-${Date.now()}`,
        author: authorName,
        authorRole: role,
        text: feedbackNote,
        timestamp: 'Just now',
      },
    ];

    post.status = 'changes_requested';
    post.feedbackNotes = feedbackNote;
    post.version = (post.version || 1) + 1;
    post.comments = newComments;
    return post;
  }

  addPostComment(postId: string, text: string, author: string, authorRole: 'client' | 'agency'): PostComment | null {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    const comment: PostComment = {
      id: `c-${Date.now()}`,
      author,
      authorRole,
      text,
      timestamp: 'Just now',
    };
    post.comments.push(comment);
    return comment;
  }

  deletePost(id: string): boolean {
    const initLen = this.posts.length;
    this.posts = this.posts.filter(p => p.id !== id);
    return this.posts.length < initLen;
  }

  // --- Analytics ---
  getAnalytics(clientId?: string): AnalyticsData | Record<string, AnalyticsData> {
    if (clientId) {
      return this.analytics[clientId] || this.analytics['client-1'];
    }
    return this.analytics;
  }

  // --- Milestones ---
  getMilestones(clientId?: string): ProjectMilestone[] {
    if (clientId) {
      return this.milestones.filter(m => m.clientId === clientId);
    }
    return [...this.milestones];
  }

  getMilestoneById(id: string): ProjectMilestone | undefined {
    return this.milestones.find(m => m.id === id);
  }

  createMilestone(data: Omit<ProjectMilestone, 'id'>): ProjectMilestone {
    const milestone: ProjectMilestone = {
      ...data,
      id: `m-${Date.now()}`,
    };
    this.milestones.push(milestone);
    return milestone;
  }

  updateMilestone(id: string, updates: Partial<ProjectMilestone>): ProjectMilestone | null {
    const index = this.milestones.findIndex(m => m.id === id);
    if (index === -1) return null;
    this.milestones[index] = { ...this.milestones[index], ...updates };
    return this.milestones[index];
  }

  toggleMilestoneTask(milestoneId: string, taskId: string): ProjectMilestone | null {
    const milestone = this.milestones.find(m => m.id === milestoneId);
    if (!milestone) return null;

    milestone.tasks = milestone.tasks.map(t =>
      t.id === taskId ? { ...t, done: !t.done } : t
    );
    const completedCount = milestone.tasks.filter(t => t.done).length;
    milestone.progress = milestone.tasks.length > 0
      ? Math.round((completedCount / milestone.tasks.length) * 100)
      : 0;

    milestone.status = milestone.progress === 100
      ? 'completed'
      : milestone.progress > 0
      ? 'in_progress'
      : 'upcoming';

    return milestone;
  }

  // --- Service Requests ---
  getRequests(status?: RequestStatus): ServiceRequest[] {
    if (status) {
      return this.requests.filter(r => r.status === status);
    }
    return [...this.requests].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getRequestById(id: string): ServiceRequest | undefined {
    return this.requests.find(r => r.id === id);
  }

  createRequest(data: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>): ServiceRequest {
    const newReq: ServiceRequest = {
      ...data,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    this.requests.unshift(newReq);
    return newReq;
  }

  updateRequestStatus(id: string, status: RequestStatus): ServiceRequest | null {
    const request = this.requests.find(r => r.id === id);
    if (!request) return null;
    request.status = status;
    return request;
  }
    // --- Clients (mutation) ---
  updateClient(id: string, updates: Partial<ClientProfile>): ClientProfile | null {
    const index = this.clients.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.clients[index] = { ...this.clients[index], ...updates };
    return this.clients[index];
  }

  // --- Users & Auth ---
  findUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  createUser(userData: Omit<User, 'id' | 'createdAt'>, passwordHash: string): User {
    const user: User = {
      ...userData,
      id: `user-${Date.now()}`,
      passwordHash,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.users.push(user);
    return user;
  }

  getUsers(): User[] {
    return [...this.users];
  }

  getDemoAccounts() {
    return this.users.map(u => ({ email: u.email, role: u.role, name: u.name }));
  }
}

export const db = new DataStore();

