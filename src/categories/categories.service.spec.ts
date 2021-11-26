import { Test, TestingModule } from '@nestjs/testing';
import { UpdateWriteOpResult } from 'mongoose';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoriesRepository } from './repository/categories.repository';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    updateById: jest.fn(),
    removeOneById: jest.fn(),
    removeAll: jest.fn(),
  };
  const id: string = '618ca7cee4bfae2412a72921';
  const idInvalid: string = 'invalid';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoriesRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  describe('when the user wants to create a new category', () => {
    it('should create a new category', async () => {
      const category: Category = {
        name: 'test',
        description: 'test',
        is_active: true,
      };
      mockRepository.create.mockReturnValue(category);
      const result = await service.create(category);
      expect(result).toEqual(category);
    });
  });

  describe('when the user consults all categories', () => {
    it('should return all categories', async () => {
      const categories = [
        {
          id: 1,
          name: 'Category 1',
          description: 'Description 1',
        },
        {
          id: 2,
          name: 'Category 2',
          description: 'Description 2',
        },
      ];

      mockRepository.findAll.mockReturnValue(categories);

      const result = await service.findAll();

      expect(result).toEqual(categories);
    });
  });

  describe('when the user consults a category by id', () => {
    it('should return a category', async () => {
      const category: Category = {
        name: 'Category 1',
        description: 'Description 1',
        is_active: true,
      };
      mockRepository.findOneById.mockReturnValue(category);
      const result = await service.findOneById(id);
      expect(result).toEqual(category);
    });
    it('should return a status code 404 if the category is not found', async () => {
      mockRepository.findOneById.mockReturnValue(null);
      try {
        await service.findOneById(id);
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.response).toBe('Category not found');
      }
    });
    it('should return a status code 400 if the id is invalid', async () => {
      try {
        await service.findOneById(idInvalid);
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.response).toBe('Invalid id');
      }
    });
  });

  describe('when the user updates a category', () => {
    it('should update a category', async () => {
      const bodyUpdate: UpdateCategoryDto = {
        name: 'Sou-um-nome',
        description: 'Sou-uma-descrição',
        is_active: true,
      };
      const result: UpdateWriteOpResult = {
        matchedCount: 1,
        modifiedCount: 1,
        upsertedCount: 0,
        acknowledged: true,
        upsertedId: null,
      };
      mockRepository.updateById.mockReturnValue(result);
      const resultService = await service.updateById(id, bodyUpdate);
      // expect(resultService).toEqual(result);
    });
    it('should return a status code 404 if the category is not found', async () => {
      try {
        await service.updateById(id, {});
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.response).toBe('Category not found');
      }
    });
    it('should return a status code 400 if the id is invalid', async () => {
      try {
        await service.updateById(idInvalid, {});
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.response).toBe('Invalid id');
      }
    });
  });

  describe('when the user removes a category by id', () => {
    it('should remove a category', async () => {
      const resultService = await service.removeOneById(id);
      // expect(resultService).toEqual(result);
    });
    it('should return a status code 400 if the id is invalid', async () => {
      try {
        await service.removeOneById(idInvalid);
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.response).toBe('Invalid id');
      }
    });
  });

  describe('when the user removes all categories', () => {
    it('should remove all categories', async () => {
      const resultService = await service.removeAll();
      // expect(resultService).toEqual(result);
    });
  });
});
