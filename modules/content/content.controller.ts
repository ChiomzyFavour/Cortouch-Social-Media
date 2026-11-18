import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ContentService } from './content.service.js'; // 👈 Added .js
import { CreatePostDto } from './dto/create-post.dto.js'; // 👈 Added .js
import { UpdatePostDto } from './dto/update-post.dto.js'; // 👈 Added .js
import { ApprovePostDto, RequestChangesDto, AddCommentDto } from './dto/post-action.dto.js'; // 👈 Added .js
import type { PostStatus, SocialPlatform } from '../../types/index.js'; // 👈 Added .js (or ../../types.js depending on your structure)

@Controller('content')
export class ContentController {
  constructor(@Inject(ContentService) private readonly contentService: ContentService) {}

  @Get()
  getPosts(
    @Query('clientId') clientId?: string,
    @Query('status') status?: string,
    @Query('platform') platform?: string,
  ) {
    const posts = this.contentService.getAllPosts({
      clientId,
      status: status as PostStatus | undefined,
      platform: platform as SocialPlatform | undefined,
    });
    return {
      success: true,
      count: posts.length,
      data: posts,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    const post = this.contentService.getPostById(id);
    return {
      success: true,
      data: post,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPost(@Body() dto: CreatePostDto) {
    const post = this.contentService.createPost(dto);
    return {
      success: true,
      message: 'Content draft created successfully',
      data: post,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('draft')
  @HttpCode(HttpStatus.CREATED)
  createDraft(@Body() dto: CreatePostDto) {
    return this.createPost(dto);
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updated = this.contentService.updatePost(id, dto);
    return {
      success: true,
      message: 'Post updated successfully',
      data: updated,
      timestamp: new Date().toISOString(),
    };
  }

  @Post(':id/approve')
  approvePost(@Param('id') id: string, @Body() dto: ApprovePostDto) {
    const approved = this.contentService.approvePost(id, dto);
    return {
      success: true,
      message: 'Post approved successfully',
      data: approved,
      timestamp: new Date().toISOString(),
    };
  }

  @Post(':id/request-changes')
  requestChanges(@Param('id') id: string, @Body() dto: RequestChangesDto) {
    const updated = this.contentService.requestChanges(id, dto);
    return {
      success: true,
      message: 'Revision requested with feedback recorded',
      data: updated,
      timestamp: new Date().toISOString(),
    };
  }

  @Post(':id/comments')
  @HttpCode(HttpStatus.CREATED)
  addComment(@Param('id') id: string, @Body() dto: AddCommentDto) {
    const comment = this.contentService.addComment(id, dto);
    return {
      success: true,
      message: 'Comment posted successfully',
      data: comment,
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    const result = this.contentService.deletePost(id);
    return {
      ...result,
      timestamp: new Date().toISOString(),
    };
  }
}