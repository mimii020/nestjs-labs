/* eslint-disable prettier/prettier */
import { TaskEntity } from "./task.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException} from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { StatusEnum } from "./status.enum";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) {}

    async addTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        const newTask = this.taskRepository.create(createTaskDto);
        return await this.taskRepository.save(newTask);
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
        const oldTask = await this.taskRepository.findOne({where: {id}});
        const updatedTask = this.taskRepository.merge(
            oldTask,
            updateTaskDto
        );

        if(updatedTask!){
            return await this.taskRepository.save(updatedTask);
        }
    }

    async deleteTask(id: string): Promise<void> {
        try {
            await this.taskRepository.softDelete(id);

        } catch (error) {
            throw error;
        }
    }

    async restoreTask(id: string): Promise<void> {
        const result = await this.taskRepository.restore(id);
        if(result.affected === 0) {
            throw new NotFoundException('tdo with id ${id} not found');
        }
    }

    async getTaskById(id: string) {
        const task = await this.taskRepository.findOne({where: {id}});
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
          }
        return task;
        
    }

    async getAllTasks(
        page: number, 
        limit: number,
        searchTerm?: string, 
        status?: StatusEnum
    ) {
        const skip = (page - 1) * limit;
        const queryBuilder = this.taskRepository.createQueryBuilder('task');
        queryBuilder.skip(skip).take(limit);
        if(searchTerm) {
            queryBuilder.andWhere('task.name LIKE :search OR task.description LIKE :search', {Search: `%${searchTerm}%`})
        }

        else if(status) {
            queryBuilder.andWhere('task.status = :status', {status})
        }
        const [tasks, count] = await queryBuilder.getManyAndCount();
        const totalPages = Math.ceil(count/limit);
        return {
            tasks,
            page,
            totalPages,
            limit,
            count
        };
    }

    async countTasksByStatus(): Promise<{[key in StatusEnum]: number}> {
        const statusCounts = await Promise.all(
            Object.values(StatusEnum).map(async (status) => {
                const count = await this.taskRepository.count({where: {status}})
                return {
                    status,
                    count 
                }
            })
        );

        return statusCounts.reduce((acc, {status, count}) => {
            acc[status] = count;
            return acc;
        }, {} as {[key in StatusEnum]: number});
    }
}