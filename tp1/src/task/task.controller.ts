/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskEntity } from "./task.entity";
import { Body } from "@nestjs/common";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { StatusEnum } from "./status.enum";

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    //create a new task
    @Post()
    async addTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return this.taskService.addTask(createTaskDto);
    }
    
    //number of tasks per status
    @Get('status-counts')
    async countTasksByStatus(): Promise<{[key in StatusEnum]: number}> {
        return this.taskService.countTasksByStatus();
    }

    //get task by id
    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<TaskEntity> {
        return this.taskService.getTaskById(id);
    }
    //get all tasks
    @Get()
    async getAllTasks(
        @Query('searchTerm') searchTerm?: string,
        @Query('status') status?: StatusEnum,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return await this.taskService.getAllTasks(page, limit, searchTerm, status);
    }
    //update a task
    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
        return this.taskService.updateTask(id, updateTaskDto);
    }
    //delete a task
    @Delete(':id')
    async deleteTask(@Param('id') id: string): Promise<void> {
        this.taskService.deleteTask(id);
    }
}