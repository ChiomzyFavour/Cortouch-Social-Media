import type { MilestoneStatus, MilestoneTask } from '../../../types/index.js'; // 👈 Added .js

export class UpdateMilestoneDto {
  title?: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
  status?: MilestoneStatus;
  progress?: number;
  owner?: string;
  category?: 'strategy' | 'production' | 'approval' | 'campaign' | 'reporting';
  tasks?: MilestoneTask[];
}

export class ToggleTaskDto {
  taskId!: string;
}