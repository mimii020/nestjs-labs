/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { SeedModule } from './seed/seed.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './cv/entities/cv.entity';
import { User } from './user/entities/user.entity';
import { Skill } from './skill/entities/skill.entity';

@Module({
  imports: [
    CvModule, 
    SkillModule, 
    UserModule, 
    SeedModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'CvTech',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '1234',
      entities: [Cv, Skill, User],
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
