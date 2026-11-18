import type { MilestoneStatus, MilestoneTask } from '../../../types/index.js'; // 👈 Added .js (or ../../../types.js)

export class CreateMilestoneDto {
  clientId!: string;
  phase!: string;
  title!: string;
  description!: string;
  startDate!: string;
  dueDate!: string;
  status?: MilestoneStatus;
  progress?: number;
  owner!: string;
  category!: 'strategy' | 'production' | 'approval' | 'campaign' | 'reporting';
  tasks?: MilestoneTask[];
}