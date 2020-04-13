import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.entity';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any): string {
    value = value.toString().toUpperCase();
    if (this.allowedStatuses.includes(value)) {
      return value;
    }

    throw new BadRequestException(`Status ${value} is not allowed`);
  }
}
