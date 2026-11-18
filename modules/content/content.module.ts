import { Module } from '@nestjs/common';
import { ContentController } from './content.controller.js'; 
import { ContentService } from './content.service.js';       
import { CommonModule } from '../../common/common.module.js'; // 👈 Added this

@Module({
  imports: [CommonModule], // 👈 Added this
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}