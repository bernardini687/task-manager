import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReadFilterDto } from './dto/read-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe) // validates the body against the DTO.
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  read(@Query() filterDto: ReadFilterDto): Task[] {
    if (Object.keys(filterDto).length === 0) {
      return this.tasksService.readAll();
    } else {
      return this.tasksService.readFiltered(filterDto);
    }
  }

  @Get('/:id')
  readOne(@Param('id') id: string): Task {
    return this.tasksService.readOne(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Task {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): void {
    return this.tasksService.delete(id);
  }
}
