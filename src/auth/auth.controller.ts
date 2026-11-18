import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service.js'; // 👈 THIS .js IS REQUIRED
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    return {
      success: true,
      data: await this.authService.register({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
        companyName: body.companyName,
      }),
      message: 'Account created successfully',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(
      body.email,
      body.password,
    );
    if (!user) throw new UnauthorizedException();
    return {
      success: true,
      data: await this.authService.login(user),
      timestamp: new Date().toISOString(),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req: any) {
    const profile = await this.authService.me(req.user.userId);
    return {
      success: true,
      data: profile,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('logout')
  async logout() {
    return { success: true, data: true };
  }
}