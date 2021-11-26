import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import * as httpMock from 'node-mocks-http';
import { CategoriesRepository } from './repository/categories.repository';
import { Category, CategoryDocument } from './entities/category.entity';
import { UpdateQuery, UpdateWriteOpResult } from 'mongoose';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;
  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    updateById: jest.fn(),
    removeOneById: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: CategoriesRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  beforeEach(() => {
    mockRepository.create.mockReset();
    mockRepository.findAll.mockReset();
    mockRepository.findOneById.mockReset();
    mockRepository.removeOneById.mockReset();
    mockRepository.updateById.mockReset();
  });

  describe('when making a get request to return all categories', () => {
    it('should return all categories', async () => {
      const mockCategories: Category[] = [
        {
          name: 'test',
          description: 'test',
          is_active: true,
        },
      ];

      mockRepository.findAll.mockResolvedValue(mockCategories);
      const response = await controller.findAll(httpMock.createResponse());
      expect(response.statusCode).toBe(200);
      expect(response._getData()).toEqual(mockCategories);
    });
  });

  describe('when making a post request to insert a categories', () => {
    it('should return a status code 201 with the category inserted', async () => {
      const body: CreateCategoryDto = {
        name: 'Sou-um-nome',
        description: 'Sou-uma-descrição',
        is_active: true,
      };
      const resultService: Category = {
        name: 'Sou-um-nome',
        description: 'Sou-uma-descrição',
        is_active: true,
      };
      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => resultService);
      expect(await controller.create(body)).toBe(resultService);
    });
  });

  describe('when making a get request to return one category by id', () => {
    it('should return a status code 200 with the category found', async () => {
      const id = '618afa3a587a29f7445d386f';
      const resultService: Category = {
        deleted_at: null,
        isDeleted: false,
        is_active: true,
        description: 'Sou-uma-descrição',
        name: 'Sou-um-nome',
      };
      jest
        .spyOn(service, 'findOneById')
        .mockImplementation(async () => resultService);
      const response = await controller.findOneById(
        id,
        httpMock.createResponse(),
      );
      expect(response.statusCode).toBe(200);
      expect(response._getData()).toEqual(resultService);
    });
  });

  describe('when making a patch request to modify a category by id', () => {
    it('should return a 204 status code if update successfully', async () => {
      const id = '618afa3a587a29f7445d386f';
      const bodyUpdate: UpdateCategoryDto = {
        name: 'Sou-um-nome',
        description: 'Sou-uma-descrição',
        is_active: true,
      };
      jest
        .spyOn(service, 'updateById')
        .mockImplementation(async () => null);
      const response = await controller.updateById(
        id,
        bodyUpdate,
        httpMock.createResponse(),
      );
      expect(response.statusCode).toBe(204);
    });
  });

  describe('when making a delete request to delete a category by id', () => {
    it('should return a 204 status code if the category was successfully deleted', async () => {
      const id = '618afa3a587a29f7445d386f';
      const response = await controller.removeOneById(
        id,
        httpMock.createResponse(),
      );
      expect(response.statusCode).toBe(204);
    });
  });

  describe('when making a delete request to delete all categories', () => {
    it('should return a 204 status code if the all category was successfully deleted', async () => {
      jest.spyOn(service, 'removeAll').mockImplementation(async () => null);
      const response = await controller.removeAll(httpMock.createResponse());
      expect(response.statusCode).toBe(204);
    });
  });
});
