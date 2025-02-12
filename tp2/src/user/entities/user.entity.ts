/* eslint-disable prettier/prettier */
import { Cv } from "../../cv/entities/cv.entity";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column()
    username: string;
  
    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @OneToMany(() => Cv, (cv) => cv.user)
    cvs: Cv[];
}
