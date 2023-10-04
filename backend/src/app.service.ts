import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Group 5107 SPEED App - Backend Initialised';
  }
}
