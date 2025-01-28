import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BearerStrategy } from '../auth/BearerStrategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }), // Registra a estratégia 'bearer'
  ],
  providers: [BearerStrategy],
})
export class AuthModule { }