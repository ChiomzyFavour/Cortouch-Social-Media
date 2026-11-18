import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// 👇 THIS .js IS REQUIRED FOR YOUR CURRENT SETUP
import { DataStoreService } from '../../common/data-store.service.js'; 
import * as bcrypt from 'bcrypt';

export type UserRole = 'client' | 'agency' | 'admin';

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  companyName?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly dataStore: DataStoreService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.dataStore.findUserByEmail(email);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async register(dto: RegisterDto) {
    const { name, email, password, role = 'client', companyName } = dto;

    if (!name || !email || !password) {
      throw new UnauthorizedException('name, email and password are required');
    }
    if (password.length < 8) {
      throw new UnauthorizedException(
        'Password must be at least 8 characters',
      );
    }

    const existing = await this.dataStore.findUserByEmail(email);
    if (existing) {
      throw new ConflictException('An account with that email already exists');
    }

    let clientId: string | undefined;
    if (role === 'client') {
      const c = (companyName ?? '').toLowerCase();
      clientId = c.includes('apex') ? 'client-2' : 'client-1';
    }

     const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.dataStore.createUser(
      {
        name,
        email: email.toLowerCase(),
        role,
        clientId,
        companyName,
      },
      passwordHash,
    );

    const { passwordHash: _ph, ...safeUser } = user;
    return this.login(safeUser);
  }


  async login(user: any) {
    const { passwordHash, ...safeUser } = user || {};
    const payload = {
      email: safeUser.email,
      sub: safeUser.id,
      role: safeUser.role,
      clientId: safeUser.clientId,
    };

    return {
      user: safeUser,
      token: this.jwtService.sign(payload),
    };
  }

  async me(userId: string) {
    const user = await this.dataStore.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('Session invalid or user not found');
    }
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}