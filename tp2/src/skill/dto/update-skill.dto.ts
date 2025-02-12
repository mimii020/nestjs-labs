/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { IsOptional } from 'class-validator';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
    @IsOptional()
    skillId: string;
}
