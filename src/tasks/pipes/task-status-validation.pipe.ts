import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any): string | never {
    value = value.toString().toUpperCase();
    if (this.allowedStatuses.includes(value)) {
      return value;
    }

    throw new BadRequestException(`Status ${value} is not allowed`);
  }
}
