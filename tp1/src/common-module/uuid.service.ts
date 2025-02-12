/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UuidService {
  generateUuid(): string {
    return uuid4();
  }
}
