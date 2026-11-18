import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
//import { CommonModule } from './common/common.module.js'; // 👈 Added .js and fixed path
import { AuthModule } from './auth/auth.module.js';       // 👈 Added .js
import { ContentModule } from '../modules/content/content.module.js'; // 👈 Added .js
import { ClientsModule } from '../modules/clients/clients.module.js'; // 👈 Added .js
import { AnalyticsModule } from '../modules/analytics/analytics.module.js'; // 👈 Added .js
import { MilestonesModule } from '../modules/milestones/milestones.module.js'; // 👈 Added .js
import { RequestsModule } from '../modules/requests/requests.module.js'; // 👈 Added .js
import { AiModule } from '../modules/ai/ai.module.js'; // 👈 Added .js

@Module({
  imports: [
    //CommonModule,
    AuthModule,
    ContentModule,
    ClientsModule,
    AnalyticsModule,
    MilestonesModule,
    RequestsModule,
    AiModule,
  ],
})
export class AppModule implements NestModule {
  configure(_consumer: MiddlewareConsumer) {
    // Middleware can be configured here if necessary
  }
}