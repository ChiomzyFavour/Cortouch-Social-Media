import { Controller, Post, Body, BadRequestException, Inject } from '@nestjs/common';
import { AiService } from './ai.service.js'; // 👈 Added .js
import { GeneratePostDto } from './dto/generate-post.dto.js'; // 👈 Added .js

@Controller('ai')
export class AiController {
  constructor(@Inject(AiService) private readonly aiService: AiService) {}

  @Post('generate-post')
  async generatePost(@Body() dto: GeneratePostDto) {
    if (!dto.topic || !dto.platform) {
      throw new BadRequestException('Both topic and platform are required to generate strategic content');
    }

    const generated = await this.aiService.generateSocialContent(dto);
    return {
      success: true,
      message: 'AI Content proposal synthesized successfully',
      data: generated,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('generate')
  async generate(@Body() dto: GeneratePostDto) {
    return this.generatePost(dto);
  }
}