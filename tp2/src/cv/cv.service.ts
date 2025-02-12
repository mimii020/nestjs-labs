/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(createCvDto: CreateCvDto, id: string ): Promise<Cv> {
    const newCv = this.cvRepository.create(createCvDto);
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) {
      throw new Error(`couldn't find user with id ${id}`);
    }
    newCv.user = user;

    if (createCvDto.skills && createCvDto.skills.length>0) {
      const skillsToAdd = [];

      for (const skillDto of createCvDto.skills) {
        let skill = await this.skillRepository.findOne({where: {designation: skillDto.designation}});
        if (!skill) {
          skill = this.skillRepository.create({designation: skillDto.designation});
          await this.skillRepository.save(skill);
        }

        skillsToAdd.push(skill);
      }

      newCv.skills = skillsToAdd;
    }

    return await this.cvRepository.save(newCv);
  }

  async findAll(): Promise<Cv[]> {
    return this.cvRepository.find();
  }

  async findOne(id: string): Promise<Cv> {
    const cv = await this.cvRepository.findOne({where: {id}, relations: ['skills', 'user']});
    if (!cv) {
      throw new NotFoundException(`couldn't find cv with id ${id}`);
    }
    return cv;
  }

  async update(id: string, updateCvDto: UpdateCvDto): Promise<Cv> {
    const cv = await this.cvRepository.findOne({where: {id}, relations: ['skills']});

    
    if (!cv) {
      throw new Error(`couldln't find cv with id ${id}`);
    }
    
    const { userId, skills, ...otherCvFields } = updateCvDto ;
    Object.assign(cv, otherCvFields);

    if (!userId) {
      const newUser = await this.userRepository.findOne({where: {id: userId}});

      if (!newUser) {
        throw new NotFoundException(`couldn't find user wiht id ${id}`);
      }
      cv.user = newUser;
    }
    
    if (skills && skills.length > 0) {
      const skillEntities = await this.skillRepository.findBy({id: In(skills)});
      
      if ( skillEntities.length < skills.length ) {
        throw new NotFoundException("some skills were not found");
      } 
      
      cv.skills = skillEntities;

      return await this.cvRepository.save(cv);
    }

  }

  

  async remove(id: string): Promise<void> {
    const result = await this.cvRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`couldn't delete cv with id ${id}`);
    }
  }
}
