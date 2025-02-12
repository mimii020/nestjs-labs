/* eslint-disable prettier/prettier */

import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { StatusEnum } from "./status.enum";
import { BaseEntity } from "src/common-module/base.entity";

@Entity()
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column({enum: StatusEnum, default: StatusEnum.IN_PROGRESS})
    status: StatusEnum;
    
}