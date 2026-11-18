import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication, Logger } from '@nestjs/common';
import express from 'express';
// 👇 THIS .js IS REQUIRED
import { AppModule } from './app.module.js'; 

/**
 * Bootstraps the NestJS application, attaches it to an existing Express
 * server (so Vite middleware and static file serving can coexist in
 * server.ts), and returns it WITHOUT calling .listen().
 */
export async function bootstrapNestApp(
  expressInstance: express.Express,
): Promise<{ app: INestApplication }> {
  const adapter = new ExpressAdapter(expressInstance);

  const app = await NestFactory.create(AppModule, adapter, {
    logger: ['error', 'warn', 'log'],
  });

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  await app.init();

  Logger.log('NestJS application initialized', 'Bootstrap');
  return { app };
}