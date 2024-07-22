import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUser(username);

    if (!user || !bcrypt.compareSync(password, user.password)) return null;

    delete user.password;
    return user;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
    };

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        type: user.type,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}
