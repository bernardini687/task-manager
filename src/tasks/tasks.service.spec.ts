import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { ReadFilterDto } from './dto/read-filter-dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TasksService', () => {
  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    readAllOrFilter: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  let service: TasksService;
  let repo;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repo = module.get<TaskRepository>(TaskRepository);
  });

  it('is defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates a task', async () => {
      const addDefaultStatus = (dto: CreateTaskDto) => ({
        status: TaskStatus.OPEN,
        ...dto,
      });
      const dto: CreateTaskDto = {
        title: 'foo',
        description: 'foo',
      };
      const task = addDefaultStatus(dto);

      repo.create.mockImplementation(addDefaultStatus);
      repo.save.mockResolvedValue(task);

      const actual = await service.create(dto);

      expect(repo.create).toBeCalledWith(task);
      expect(repo.save).toBeCalledWith(task);
      expect(actual).toEqual(task);
    });
  });

  describe('read', () => {
    it('reads all tasks', async () => {
      const tasks = ['task 1'];
      repo.readAllOrFilter.mockResolvedValue(tasks);

      const filters: ReadFilterDto = {
        status: TaskStatus.DONE,
        search: 'foo',
      };
      const actual = await service.read(filters);

      expect(actual).toContain('task 1');
    });
  });

  describe('readOne', () => {
    it('reads one task', async () => {
      const task = { id: 1 };
      repo.findOne.mockResolvedValue(task);

      const actual = await service.readOne(1);

      expect(repo.findOne).toBeCalledWith(1);
      expect(actual).toEqual(task);
    });

    it('throws not found', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.readOne(2)).rejects.toThrow(NotFoundException);
      expect(repo.findOne).toBeCalledWith(2);
    });
  });

  describe('delete', () => {
    it('deletes one task', async () => {
      repo.delete.mockResolvedValue({ affected: 1 });

      const actual = await service.delete(1);

      expect(repo.delete).toBeCalledWith(1);
      expect(actual).toEqual(undefined);
    });

    it('throws not found', async () => {
      repo.delete.mockResolvedValue({ affected: 0 });

      await expect(service.delete(2)).rejects.toThrow(NotFoundException);
      expect(repo.delete).toBeCalledWith(2);
    });
  });
});
