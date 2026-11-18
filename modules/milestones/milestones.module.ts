import { Module } from '@nestjs/common';
import { MilestonesController } from './milestones.controller.js';
import { MilestonesService } from './milestones.service.js';
import { CommonModule } from '../../common/common.module.js'; // 👈 Added import

@Module({
  imports: [CommonModule], // 👈 Added to imports array
  controllers: [MilestonesController],
  providers: [MilestonesService],
  exports: [MilestonesService],
})
export class MilestonesModule {}