/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvService } from '../cv/cv.service';
import { Cv } from '../cv/entities/cv.entity';
import { Skill } from '../skill/entities/skill.entity';
import { SkillService } from '../skill/skill.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { SeedService } from './seed.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Cv, Skill]),
    ],
    providers: [
        CvService,
        SkillService,
        UserService,
        SeedService,
    ]
})
export class SeedModule {}
