/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { CommonModuleModule } from 'src/common-module/common-module.module';

@Module({
  imports: [CommonModuleModule],
  providers: [TestService]
})
export class TestModule {}
