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

  // create(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // readAll(): Task[] {
  //   return this.tasks;
  // }
  // readFiltered(filterDto: ReadFilterDto): Task[] {
  //   const { status: statusFilter, search } = filterDto;
  //   let tasks = this.tasks;
  //   if (statusFilter) {
  //     tasks = tasks.filter(({ status }) => status === statusFilter);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(task =>
  //       [task.title, task.description].some(field =>
  //         new RegExp(search, 'i').test(field)
  //       )
  //     );
  //   }
  //   return tasks;
  // }

  readOne(id: number): Promise<Task> | never {
    return this.findById(id);
  }

  // updateStatus(id: string, status: TaskStatus): Task | never {
  //   const taskIndex = this.tasks.findIndex(task => task.id === id);
  //   if (taskIndex === -1) {
  //     throw new NotFoundException();
  //   }
  //   this.tasks[taskIndex].status = status;
  //   return this.tasks[taskIndex];
  // }
  // delete(id: string): void | never {
  //   const found = this.findById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }

  private async findById(id: number): Promise<Task> | never {
    const found = await this.taskRepo.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
