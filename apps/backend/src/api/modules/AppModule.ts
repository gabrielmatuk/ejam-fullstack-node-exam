import { Module } from '@nestjs/common';

import { HeroModule } from './HeroModule';
import { AppController } from '../controllers/AppController';
import { AppService } from '../../core/services/AppService';
import { AuthModule } from './AuthModule';


@Module({
  imports: [HeroModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
