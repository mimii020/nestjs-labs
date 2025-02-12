/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsInt, IsArray, ArrayNotEmpty } from "class-validator";
import { CreateSkillDto } from "src/skill/dto/create-skill.dto";

export class CreateCvDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    firstname: string;
  
    @IsInt()
    @IsNotEmpty()
    age: number;
  
    @IsString()
    @IsNotEmpty()
    cin: string;
  
    @IsString()
    @IsNotEmpty()
    job: string;
  
    @IsString()
    @IsNotEmpty()
    path: string;

    @IsArray()
    @ArrayNotEmpty()
    skills: CreateSkillDto[];
}
