import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { GeneratePostDto } from './dto/generate-post.dto.js'; // 👈 Added .js
import { AIContentGenerationResponse } from '../../types/index.js'; // 👈 Added .js (or ../../types.js)

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly genAI: GoogleGenAI | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        this.genAI = new GoogleGenAI({ apiKey });
        this.logger.log('Gemini API client initialized successfully');
      } catch (err) {
        this.logger.warn(`Could not initialize Gemini API client: ${err}`);
      }
    } else {
      this.logger.log('GEMINI_API_KEY not found in environment; using strategic template generator');
    }
  }

  async generateSocialContent(dto: GeneratePostDto): Promise<AIContentGenerationResponse> {
    const { topic, platform, tone = 'luxurious', targetAudience = 'Modern high-value consumers', cta } = dto;

    if (this.genAI && process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are the lead social media strategist and copywriter for Cortouch Media, a premier boutique creative agency.
Generate a high-converting, polished social media post proposal for the following parameters:
- Platform: ${platform}
- Topic: ${topic}
- Tone / Aesthetic: ${tone}
- Target Audience: ${targetAudience}
- Intended Call to Action: ${cta || 'Default to brand discovery / link in bio'}

Output strictly valid JSON with this exact shape without any markdown fences:
{
  "title": "A compelling internal headline for the creative deck",
  "caption": "The complete post caption including line breaks and emoji where appropriate for ${platform}",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
  "hookStrategy": "A 1-sentence breakdown of why the opening 3 seconds / first sentence will convert",
  "suggestedMediaType": "video" | "carousel" | "image"
}`;

        const response = await this.genAI.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const rawText = response.text || '';
        const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedText);

        return {
          title: parsed.title || `${topic} Campaign`,
          caption: parsed.caption || `Discover the future of ${topic}. #CortouchMedia`,
          hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : ['#CortouchMedia', '#SocialStrategy'],
          hookStrategy: parsed.hookStrategy || 'High-contrast visual contrast with urgent initial question.',
          suggestedMediaType: ['video', 'carousel', 'image'].includes(parsed.suggestedMediaType)
            ? parsed.suggestedMediaType
            : platform === 'tiktok' ? 'video' : 'carousel',
        } as AIContentGenerationResponse;
      } catch (error) {
        this.logger.warn(`Gemini generation encountered an issue, falling back to heuristic generation: ${error}`);
      }
    }

    return this.fallbackGenerate(dto);
  }

  private fallbackGenerate(dto: GeneratePostDto): AIContentGenerationResponse {
    const { topic, platform, tone = 'luxurious', targetAudience = 'Modern innovators', cta } = dto;

    const toneAdjectives: Record<string, string[]> = {
      luxurious: ['uncompromising precision', 'refined aesthetics', 'bespoke craftsmanship', 'timeless exclusivity'],
      authoritative: ['data-backed frameworks', 'industry benchmarks', 'strategic foresight', 'market leadership'],
      viral: ['the secret nobody is talking about', 'game-changing transformation', 'stop scrolling', 'instant upgrade'],
      inspirational: ['empowering vision', 'breakthrough potential', 'journey of excellence', 'limitless horizon'],
      casual: ['behind the scenes reality', 'daily favorite essentials', 'real talk', 'weekend vibes'],
    };

    const adjectives = toneAdjectives[tone] || toneAdjectives.luxurious;
    const mediaType: 'image' | 'video' | 'carousel' =
      platform === 'tiktok' || platform === 'youtube'
        ? 'video'
        : platform === 'linkedin'
        ? 'carousel'
        : 'image';

    const defaultCta = cta || (platform === 'linkedin' ? 'Drop your thoughts in the comments below.' : 'Tap link in bio to explore the exclusive release.');

    const caption = `Elevate your standard. When it comes to ${topic}, ordinary approaches no longer cut through the noise.

At Cortouch Media, we engineer digital touchpoints defined by ${adjectives[0]} and ${adjectives[1]}. Designed specifically for ${targetAudience} who value distinction over imitation.

Key takeaway:
• Intentional pacing beats algorithm chasing
• Curated narrative builds lasting brand equity
• Seamless execution turns casual views into devoted advocates

${defaultCta}

#CortouchMedia #BrandExcellence #${topic.replace(/\s+/g, '')} #ModernStrategy`;

    const hashtags = [
      `#${topic.replace(/[^a-zA-Z0-9]/g, '')}`,
      '#CortouchMedia',
      '#CreativeDirection',
      '#SocialMediaGrowth',
      '#BrandElevation',
    ];

    return {
      title: `${topic}: Strategic ${tone.toUpperCase()} Narrative`,
      caption,
      hashtags,
      hookStrategy: `Disrupts user scrolling patterns using sensory framing around "${topic}" aligned with ${tone} expectations.`,
      suggestedMediaType: mediaType,
    };
  }
}