import { db } from '../data/store';
import { ProjectMilestone } from '../types';

export class MilestonesService {
  getMilestones(clientId?: string): ProjectMilestone[] {
    return db.getMilestones(clientId);
  }

  getMilestoneById(id: string): ProjectMilestone | undefined {
    return db.getMilestoneById(id);
  }

  createMilestone(data: Omit<ProjectMilestone, 'id'>): ProjectMilestone {
    return db.createMilestone(data);
  }

  updateMilestone(id: string, updates: Partial<ProjectMilestone>): ProjectMilestone | null {
    return db.updateMilestone(id, updates);
  }

  toggleTask(milestoneId: string, taskId: string): ProjectMilestone | null {
    return db.toggleMilestoneTask(milestoneId, taskId);
  }

  getClientMilestoneSummary(clientId: string) {
    const milestones = this.getMilestones(clientId);
    const total = milestones.length;
    const completed = milestones.filter(m => m.status === 'completed').length;
    const inProgress = milestones.filter(m => m.status === 'in_progress').length;
    const upcoming = milestones.filter(m => m.status === 'upcoming').length;
    const delayed = milestones.filter(m => m.status === 'delayed').length;

    const overallProgress = total > 0
      ? Math.round(milestones.reduce((acc, m) => acc + (m.progress || 0), 0) / total)
      : 0;

    return {
      clientId,
      total,
      completed,
      inProgress,
      upcoming,
      delayed,
      overallProgress,
    };
  }
}

export const milestonesService = new MilestonesService();
