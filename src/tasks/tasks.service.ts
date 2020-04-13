import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }
}
