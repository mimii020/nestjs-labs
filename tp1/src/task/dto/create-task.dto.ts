/* eslint-disable prettier/prettier */

import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { ErrorMessages } from "src/constants/error-messages";


export class CreateTaskDto {
    @IsNotEmpty({message: ErrorMessages.nameRequired})
    @MinLength(3, {message: ErrorMessages.nameTooShort})
    @MaxLength(10,{message: ErrorMessages.nameTooLong})
    name: string;
    @IsNotEmpty({message: ErrorMessages.descriptionRequired})
    @MinLength(10, {message: ErrorMessages.descriptionTooShort})
    description: string;
}