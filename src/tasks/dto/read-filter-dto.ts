import { TaskStatus } from '../task.entity';

export class ReadFilterDto {
  status: TaskStatus;
  search: string;
}
