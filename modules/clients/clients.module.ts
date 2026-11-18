import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller.js';
import { ClientsService } from './clients.service.js';
import { CommonModule } from '../../common/common.module.js'; // 👈 Added import

@Module({
  imports: [CommonModule], // 👈 Added to imports array
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}