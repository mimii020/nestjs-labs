/* eslint-disable prettier/prettier */
import { ErrorMessages } from "src/constants/error-messages";
import { StatusEnum } from "../status.enum";
import { CreateTaskDto } from "./create-task.dto";
import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from "class-validator";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
   @IsOptional() 
   @IsIn([StatusEnum.COMPLETED, StatusEnum.IN_PROGRESS, StatusEnum.PENDING],
    {message: ErrorMessages.statusWrong,}
   )
    status: StatusEnum;
}