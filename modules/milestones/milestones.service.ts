import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { DataStoreService } from '../../common/data-store.service.js'; // 👈 Added .js
import { ProjectMilestone } from '../../types/index.js'; // 👈 Added .js (or ../../types.js depending on your structure)
import { CreateMilestoneDto } from './dto/create-milestone.dto.js'; // 👈 Added .js
import { UpdateMilestoneDto } from './dto/update-milestone.dto.js'; // 👈 Added .js

@Injectable()
export class MilestonesService {
  constructor(@Inject(DataStoreService) private readonly dataStore: DataStoreService) {}

  getAllMilestones(clientId?: string): ProjectMilestone[] {
    return this.dataStore.getMilestones(clientId);
  }

  getMilestoneById(id: string): ProjectMilestone {
    const milestone = this.dataStore.getMilestoneById(id);
    if (!milestone) {
      throw new NotFoundException(`Milestone with ID "${id}" was not found`);
    }
    return milestone;
  }

  createMilestone(dto: CreateMilestoneDto): ProjectMilestone {
    if (!dto.title || !dto.clientId) {
      throw new BadRequestException('Milestone title and clientId are required');
    }
    return this.dataStore.createMilestone({
      clientId: dto.clientId,
      phase: dto.phase || 'Phase 1',
      title: dto.title,
      description: dto.description || '',
      startDate: dto.startDate || new Date().toISOString().split('T')[0],
      dueDate: dto.dueDate || new Date().toISOString().split('T')[0],
      status: dto.status || 'upcoming',
      progress: dto.progress || 0,
      owner: dto.owner || 'Agency Project Lead',
      category: dto.category || 'production',
      tasks: dto.tasks || [],
    });
  }

  updateMilestone(id: string, dto: UpdateMilestoneDto): ProjectMilestone {
    this.getMilestoneById(id);
    const updated = this.dataStore.updateMilestone(id, dto);
    if (!updated) {
      throw new NotFoundException(`Milestone with ID "${id}" was not found`);
    }
    return updated;
  }

  toggleTask(milestoneId: string, taskId: string): ProjectMilestone {
    this.getMilestoneById(milestoneId);
    if (!taskId) {
      throw new BadRequestException('Task ID is required');
    }
    const updated = this.dataStore.toggleMilestoneTask(milestoneId, taskId);
    if (!updated) {
      throw new NotFoundException(`Task with ID "${taskId}" not found in milestone "${milestoneId}"`);
    }
    return updated;
  }
}