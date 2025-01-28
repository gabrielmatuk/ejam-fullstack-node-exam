import { Controller, Get } from '@nestjs/common';

import { AppService } from '../../core/services/AppService';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  index() {
    return this.appService.index();
  }
}