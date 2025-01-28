import { Module } from '@nestjs/common';

import { HeroService } from '../../core/services/HeroService';
import { HeroController } from '../controllers/HeroController';

@Module({
  imports: [],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule { }
