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
import { RequestsService } from './requests.service.js'; // 👈 Added .js
import { CreateRequestDto, UpdateRequestStatusDto } from './dto/create-request.dto.js'; // 👈 Added .js
import type { RequestStatus } from '../../types/index.js'; // 👈 Added .js (or ../../types.js)

@Controller('requests')
export class RequestsController {
  constructor(@Inject(RequestsService) private readonly requestsService: RequestsService) {}

  @Get()
  getRequests(@Query('status') status?: string) {
    const requests = this.requestsService.getAllRequests(status as RequestStatus | undefined);
    return {
      success: true,
      count: requests.length,
      data: requests,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('summary')
  getSummary() {
    const summary = this.requestsService.getPipelineSummary();
    return {
      success: true,
      data: summary,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  getRequestById(@Param('id') id: string) {
    const request = this.requestsService.getRequestById(id);
    return {
      success: true,
      data: request,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createRequest(@Body() dto: CreateRequestDto) {
    const request = this.requestsService.createRequest(dto);
    return {
      success: true,
      message: 'Service request submitted successfully. A Cortouch strategist will review within 24 hours.',
      data: request,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateRequestStatusDto) {
    const updated = this.requestsService.updateStatus(id, dto);
    return {
      success: true,
      message: `Request status updated to "${dto.status}"`,
      data: updated,
      timestamp: new Date().toISOString(),
    };
  }
}