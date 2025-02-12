/* eslint-disable prettier/prettier */

import { rand, randEmail, randFullName, randImg, randJobTitle, randLastName, randNumber, randPassword, randSkill, randText } from "@ngneat/falso";
import { Cv } from "../cv/entities/cv.entity";
import { Skill } from "../skill/entities/skill.entity";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


export class SeedService {
    constructor(
        @InjectRepository(Cv)
        private readonly cvRepository: Repository<Cv>,
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async seedUsers() {
        const users = Array.from({length: 10}).map(() => {
            return this.userRepository.create({
                username: randFullName(),
                email: randEmail(),
                password: randPassword(),
            })
        });

        await this.userRepository.save(users);
    }

    async seedSkills() {
        const skills = Array.from({length: 10}).map(() => {
            return this.skillRepository.create({
                designation: randSkill()
            })
        })

        await this.skillRepository.save(skills);
    }

    async seedCvs() {
        const users = await this.userRepository.find();
        const skills = await this.skillRepository.find();
        const cvs = Array.from({length: 10}).map(() => {
            const randomUser = rand(users);
            const randomSkills = rand(skills, {length: randNumber({min: 1, max: 5})})
            return this.cvRepository.create({
                name: randLastName(),
                firstname: randomUser.username,
                age: randNumber({min: 18, max: 65}),
                cin: randText({charCount: 8}),
                job: randJobTitle(),
                path: randImg(),
                skills: randomSkills,

            })
        })

        this.cvRepository.save(cvs);
    }

    async seedDatabase() {
        await this.seedUsers();
        await this.seedSkills();
        await this.seedCvs();
    }

}