import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  readAll(): Task[] {
    return this.tasksService.readAll();
  }

  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.create(title, description);
  }
}
