import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReadFilterDto } from './dto/read-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }

  readAll(): Task[] {
    return this.tasks;
  }

  readFiltered(filterDto: ReadFilterDto): Task[] {
    const { status: statusFilter, search } = filterDto;
    let tasks = this.tasks;

    if (statusFilter) {
      tasks = tasks.filter(({ status }) => status === statusFilter);
    }
    if (search) {
      tasks = tasks.filter(task =>
        [task.title, task.description].some(field =>
          new RegExp(search, 'i').test(field)
        )
      );
    }

    return tasks;
  }

  readOne(id: string): Task {
    return this.findById(id);
  }

  updateStatus(id: string, status: TaskStatus): Task | never {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException();
    }
    this.tasks[taskIndex].status = status;

    return this.tasks[taskIndex];
  }

  delete(id: string): void | never {
    const found = this.findById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }

  private findById(id: string): Task | never {
    const found = this.tasks.find(task => task.id === id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }
}
