import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  readAll(): Task[] {
    return this.tasks;
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
