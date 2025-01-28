import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(token: string): Promise<boolean> {
    const isValid = token === process.env.TOKEN_SECRET;
    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }
    return isValid;
  }
}