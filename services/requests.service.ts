import { db } from '../data/store';
import { ServiceRequest, RequestStatus } from '../types';

export class RequestsService {
  getRequests(status?: RequestStatus): ServiceRequest[] {
    return db.getRequests(status);
  }

  getRequestById(id: string): ServiceRequest | undefined {
    return db.getRequestById(id);
  }

  calculateEstimate(services: string[], platformsCount: number): number {
    const packages = db.getPackages();
    let total = 0;
    for (const serviceId of services) {
      const pkg = packages.find(p => p.id === serviceId);
      if (pkg) {
        total += pkg.priceMonthly;
      }
    }

    if (total === 0) {
      // Default base calculation
      total = 1850;
    }

    // Platform volume multiplier
    if (platformsCount > 3) {
      total = Math.round(total * 1.15);
    }
    return total;
  }

  createRequest(data: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>): ServiceRequest {
    const estimatedQuote = data.estimatedQuoteMonthly || this.calculateEstimate(data.services || [], data.platforms?.length || 1);
    return db.createRequest({
      ...data,
      estimatedQuoteMonthly: estimatedQuote,
    });
  }

  updateStatus(id: string, status: RequestStatus): ServiceRequest | null {
    return db.updateRequestStatus(id, status);
  }

  getPipelineSummary() {
    const all = db.getRequests();
    return {
      total: all.length,
      pending: all.filter(r => r.status === 'pending').length,
      reviewed: all.filter(r => r.status === 'reviewed').length,
      proposalSent: all.filter(r => r.status === 'proposal_sent').length,
      approved: all.filter(r => r.status === 'approved').length,
      active: all.filter(r => r.status === 'active').length,
      estimatedPipelineValue: all.reduce((sum, r) => sum + (r.estimatedQuoteMonthly || 0), 0),
    };
  }
}

export const requestsService = new RequestsService();
