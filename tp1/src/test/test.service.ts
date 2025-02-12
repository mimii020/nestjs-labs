/* eslint-disable prettier/prettier */
import { UuidService } from 'src/common-module/uuid.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  constructor(private readonly uuidService: UuidService ) {}
  testUuidGeneratio(): string {
    return this.uuidService.generateUuid();
  }
}
