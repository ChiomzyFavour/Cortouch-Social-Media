import { GoogleGenAI } from '@google/genai';
import { AIContentGenerationRequest, AIContentGenerationResponse } from '../types';

export class AIService {
  private client: GoogleGenAI | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        this.client = new GoogleGenAI({ apiKey });
      } catch (err) {
        console.warn('AIService: Could not initialize GoogleGenAI client:', err);
      }
    }
  }

  async generateSocialContent(req: AIContentGenerationRequest): Promise<AIContentGenerationResponse> {
    const { topic, platform, tone = 'authoritative', targetAudience = 'modern consumers', cta = 'Learn more' } = req;

    if (this.client) {
      try {
        const prompt = `You are a world-class social media strategist and copywriter for Cortouch Media brand.
Generate an engaging, high-conversion post draft for the following brief:
- Topic: ${topic}
- Platform: ${platform}
- Tone of Voice: ${tone}
- Target Audience: ${targetAudience}
- Desired Call-to-Action (CTA): ${cta}

Respond ONLY with valid JSON in this exact structure:
{
  "title": "A short, memorable hook or title for the post",
  "caption": "The full engaging caption formatted for ${platform}, including emojis and linebreaks",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
  "hookStrategy": "1-2 sentence explanation of the psychological retention hook used",
  "suggestedMediaType": "video" | "image" | "carousel"
}`;

        const response = await this.client.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return {
            title: parsed.title || `${topic} Showcase`,
            caption: parsed.caption || `Exciting updates regarding ${topic}. ${cta}`,
            hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : [`#${platform}`, `#CortouchMedia`],
            hookStrategy: parsed.hookStrategy || 'High-retention visual hook optimized for algorithmic discovery.',
            suggestedMediaType: parsed.suggestedMediaType || 'video',
          };
        }
      } catch (error) {
        console.error('AIService generation error, using curated generator fallback:', error);
      }
    }

    // Dynamic template fallback when API key is unconfigured or in offline demo mode
    return this.generateFallbackContent(topic, platform, tone, targetAudience, cta);
  }

  private generateFallbackContent(
    topic: string,
    platform: string,
    tone: string,
    audience: string,
    cta: string
  ): AIContentGenerationResponse {
    const cleanTopic = topic.trim();
    const capitalizedTopic = cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1);

    const platformHashtags: Record<string, string[]> = {
      instagram: ['#CortouchMedia', '#VisualAesthetic', '#BrandGrowth', '#CreativeDirection', '#InstaDesign'],
      tiktok: ['#FashionTok', '#TrendAlert', '#BehindTheScenes', '#ViralHacks', '#CortouchMedia'],
      linkedin: ['#ThoughtLeadership', '#B2BStrategy', '#MarketingInnovation', '#BrandStrategy', '#GrowthMindset'],
      youtube: ['#Shorts', '#CreatorEconomy', '#DeepDive', '#Masterclass', '#CortouchMedia'],
      x: ['#TechTalk', '#BrandBuilding', '#DesignSystems', '#GrowthMarketing'],
      facebook: ['#CommunityFocus', '#Storytelling', '#BrandValues', '#CortouchMedia'],
    };

    const hashtags = platformHashtags[platform] || ['#CortouchMedia', '#SocialStrategy', '#ModernBrand'];

    return {
      title: `${capitalizedTopic}: The Next Evolution`,
      caption: `We are redefining what’s possible in ${cleanTopic.toLowerCase()}.\n\nBuilt specifically for ${audience}, this release merges refined aesthetic standards with data-backed performance.\n\n👉 ${cta} — tap the link to explore the full story.\n\nWhat’s your take on this direction? Drop your thoughts below! 👇`,
      hashtags: [`#${cleanTopic.replace(/\\s+/g, '')}`, ...hashtags],
      hookStrategy: `Presents a high-contrast curiosity gap tailored to ${tone} tone and immediate ${cta} action.`,
      suggestedMediaType: platform === 'tiktok' ? 'video' : platform === 'linkedin' ? 'carousel' : 'image',
    };
  }
}

export const aiService = new AIService();
