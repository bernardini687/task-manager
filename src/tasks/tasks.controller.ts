import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReadFilterDto } from './dto/read-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  // validates the body against the DTO.
  create(@Body(ValidationPipe) createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  read(@Query(ValidationPipe) filterDto: ReadFilterDto) {
    return this.tasksService.read(filterDto);
  }

  @Get('/:id')
  readOne(@Param('id', ParseIntPipe) id: number): Promise<Task> | never {
    return this.tasksService.readOne(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> | never {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> | never {
    return this.tasksService.delete(id);
  }
}
