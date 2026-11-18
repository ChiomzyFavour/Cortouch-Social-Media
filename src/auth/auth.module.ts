import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js'; // 👈 Added .js
import { AuthController } from './auth.controller.js'; // 👈 Added .js
import { JwtStrategy } from './jwt.strategy.js'; // 👈 Added .js
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DataStoreService } from '../../common/data-store.service.js'; // 👈 Added .js

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY_CHANGE_THIS_IN_PRODUCTION',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, DataStoreService], 
  controllers: [AuthController],
})
export class AuthModule {}