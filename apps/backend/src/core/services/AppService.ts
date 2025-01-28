import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  index() {
    return { success: true, message: 'EJam Exam', version: 1 };
  }
}
