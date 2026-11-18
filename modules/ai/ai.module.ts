import { Module } from '@nestjs/common';
import { AiController } from './ai.controller.js';
import { AiService } from './ai.service.js';
import { CommonModule } from '../../common/common.module.js'; // 👈 Added import

@Module({
  imports: [CommonModule], // 👈 Added to imports array
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}