/* eslint-disable prettier/prettier */
import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Cv {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    firstname: string;

    @Column()
    age: number;

    @Column()
    cin: string;

    @Column()
    job: string;

    @Column()
    path: string;

    @ManyToOne(() => User, (user) => user.cvs)
    user: User;

    @ManyToMany(() => Skill, (skill) => skill.cvs)
    @JoinTable() 
    skills: Skill[];
}
