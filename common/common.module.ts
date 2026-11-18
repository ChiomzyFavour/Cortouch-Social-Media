import { Module, Global } from '@nestjs/common';
import { DataStoreService } from './data-store.service.js'; // 👈 Added .js
import { LoggingInterceptor } from './logging.interceptor.js'; // 👈 Added .js
import { AllExceptionsFilter } from './http-exception.filter.js'; // 👈 Added .js

@Global()
@Module({
  providers: [DataStoreService, LoggingInterceptor, AllExceptionsFilter],
  exports: [DataStoreService, LoggingInterceptor, AllExceptionsFilter],
})
export class CommonModule {}