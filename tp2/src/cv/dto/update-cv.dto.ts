/* eslint-disable prettier/prettier */
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCvDto } from './create-cv.dto';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCvDto extends PartialType( OmitType(CreateCvDto, ['skills'] as const )
) {

    @IsString()
    @IsOptional()
    userId: string;

    @IsArray()
    @IsOptional()
    @IsNumber({}, {each: true})
    skills?: string[];
}
