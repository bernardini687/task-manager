import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReadFilterDto } from './dto/read-filter-dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepo: TaskRepository
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = this.taskRepo.create({
      status: TaskStatus.OPEN,
      ...createTaskDto,
    });
    return await this.taskRepo.save(task);
  }

  read(filterDto: ReadFilterDto) {
    return this.taskRepo.readAllOrFilter(filterDto);
  }

  async readOne(id: number): Promise<Task> | never {
    const found = await this.taskRepo.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  // TODO: more efficient way of doing this?
  async updateStatus(id: number, status: TaskStatus): Promise<Task> | never {
    const result = await this.taskRepo.update(id, { status });
    if (result.affected === 0) {
      throw new NotFoundException();
    } else {
      return this.readOne(id);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.taskRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
