/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from '../skill/entities/skill.entity';
import { Cv } from './entities/cv.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cv, Skill, User])],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
