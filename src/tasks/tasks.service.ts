import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReadFilterDto } from './dto/read-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

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
    return this.tasks.find(task => task?.id === id);
  }

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

  updateStatus(id: string, status: TaskStatus): Task {
    const taskIndex = this.tasks.findIndex(task => task?.id === id);
    this.tasks[taskIndex].status = status;

    return this.tasks[taskIndex];
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter(task => task?.id !== id);
  }
}
