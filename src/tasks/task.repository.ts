import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { ReadFilterDto } from './dto/read-filter-dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async readAllOrFilter(filterDto: ReadFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` }
      );
    }

    return await query.getMany();
  }
}
