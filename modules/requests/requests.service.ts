import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { DataStoreService } from '../../common/data-store.service.js'; // 👈 Added .js
import { ServiceRequest, RequestStatus } from '../../types/index.js'; // 👈 Added .js (or ../../types.js)
import { CreateRequestDto, UpdateRequestStatusDto } from './dto/create-request.dto.js'; // 👈 Added .js

@Injectable()
export class RequestsService {
  constructor(@Inject(DataStoreService) private readonly dataStore: DataStoreService) {}

  getAllRequests(status?: RequestStatus): ServiceRequest[] {
    return this.dataStore.getRequests(status);
  }

  getRequestById(id: string): ServiceRequest {
    const request = this.dataStore.getRequestById(id);
    if (!request) {
      throw new NotFoundException(`Service request with ID "${id}" was not found`);
    }
    return request;
  }

  createRequest(dto: CreateRequestDto): ServiceRequest {
    if (!dto.clientName || !dto.companyName || !dto.email) {
      throw new BadRequestException('Client name, company name, and email are required');
    }

    const estimatedQuote = this.calculateEstimatedQuote(dto);

    return this.dataStore.createRequest({
      clientName: dto.clientName,
      companyName: dto.companyName,
      email: dto.email,
      phone: dto.phone,
      website: dto.website,
      platforms: dto.platforms || ['instagram'],
      services: dto.services || ['Social Media Management'],
      monthlyBudget: dto.monthlyBudget || '$2,500 - $5,000/mo',
      goals: dto.goals || ['Brand Awareness & Organic Growth'],
      targetAudience: dto.targetAudience || 'Modern consumers & professionals',
      preferredStartDate: dto.preferredStartDate || 'As soon as possible',
      notes: dto.notes,
      estimatedQuoteMonthly: estimatedQuote,
    });
  }

  updateStatus(id: string, dto: UpdateRequestStatusDto): ServiceRequest {
    this.getRequestById(id);
    const updated = this.dataStore.updateRequestStatus(id, dto.status);
    if (!updated) {
      throw new NotFoundException(`Request with ID "${id}" could not be updated`);
    }
    return updated;
  }

  getPipelineSummary() {
    const all = this.dataStore.getRequests();
    const pending = all.filter(r => r.status === 'pending');
    const reviewed = all.filter(r => r.status === 'reviewed');
    const proposalSent = all.filter(r => r.status === 'proposal_sent');
    const approved = all.filter(r => r.status === 'approved' || r.status === 'active');

    const totalPipelineValue = all.reduce((sum, r) => sum + (r.estimatedQuoteMonthly || 0), 0);

    return {
      totalRequests: all.length,
      pendingCount: pending.length,
      reviewedCount: reviewed.length,
      proposalSentCount: proposalSent.length,
      approvedCount: approved.length,
      totalPipelineValue,
    };
  }

  private calculateEstimatedQuote(dto: Partial<CreateRequestDto>): number {
    let base = 1850;
    const platformCount = dto.platforms?.length || 1;
    base += (platformCount - 1) * 450;

    const services = dto.services || [];
    if (services.some(s => s.toLowerCase().includes('video') || s.toLowerCase().includes('tiktok'))) {
      base += 950;
    }
    if (services.some(s => s.toLowerCase().includes('ad') || s.toLowerCase().includes('paid'))) {
      base += 800;
    }
    if (services.some(s => s.toLowerCase().includes('executive') || s.toLowerCase().includes('influencer'))) {
      base += 600;
    }

    return base;
  }
}