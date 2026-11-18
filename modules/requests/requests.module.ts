import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller.js';
import { RequestsService } from './requests.service.js';
import { CommonModule } from '../../common/common.module.js'; // 👈 Added this

@Module({
  imports: [CommonModule], // 👈 Added this
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}