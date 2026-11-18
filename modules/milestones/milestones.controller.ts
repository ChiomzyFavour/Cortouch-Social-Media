import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { MilestonesService } from './milestones.service.js'; // 👈 Added .js
import { CreateMilestoneDto } from './dto/create-milestone.dto.js'; // 👈 Added .js
import { UpdateMilestoneDto, ToggleTaskDto } from './dto/update-milestone.dto.js'; // 👈 Added .js

@Controller('milestones')
export class MilestonesController {
  constructor(@Inject(MilestonesService) private readonly milestonesService: MilestonesService) {}

  @Get()
  getMilestones(@Query('clientId') clientId?: string) {
    const milestones = this.milestonesService.getAllMilestones(clientId);
    return {
      success: true,
      count: milestones.length,
      data: milestones,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  getMilestoneById(@Param('id') id: string) {
    const milestone = this.milestonesService.getMilestoneById(id);
    return {
      success: true,
      data: milestone,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createMilestone(@Body() dto: CreateMilestoneDto) {
    const milestone = this.milestonesService.createMilestone(dto);
    return {
      success: true,
      message: 'Milestone created successfully',
      data: milestone,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id')
  updateMilestone(@Param('id') id: string, @Body() dto: UpdateMilestoneDto) {
    const updated = this.milestonesService.updateMilestone(id, dto);
    return {
      success: true,
      message: 'Milestone updated successfully',
      data: updated,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/tasks/toggle')
  toggleTask(@Param('id') id: string, @Body() dto: ToggleTaskDto) {
    const updated = this.milestonesService.toggleTask(id, dto.taskId);
    return {
      success: true,
      message: 'Task status updated',
      data: updated,
      timestamp: new Date().toISOString(),
    };
  }

  @Post(':id/tasks/:taskId/toggle')
  toggleTaskByParam(@Param('id') id: string, @Param('taskId') taskId: string) {
    const updated = this.milestonesService.toggleTask(id, taskId);
    return {
      success: true,
      message: 'Task status updated',
      data: updated,
      timestamp: new Date().toISOString(),
    };
  }
}