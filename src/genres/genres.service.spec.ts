import { Test, TestingModule } from '@nestjs/testing';
import { UpdateWriteOpResult } from 'mongoose';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { GenresService } from './genres.service';
import { GenresRepository } from './repository/genres.repository';

describe('GenresService', () => {
  let service: GenresService;
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
        GenresService,
        {
          provide: GenresRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GenresService>(GenresService);
  });

  describe('when the user consults all genres', () => {
    it('should return all genres', async () => {
      const genres = [
        {
          id: 1,
          name: 'Genre 1',
        },
        {
          id: 2,
          name: 'Genre 2',
        },
      ];

      mockRepository.findAll.mockReturnValue(genres);

      const result = await service.findAll();

      expect(result).toEqual(genres);
    });
  });

  describe('when the user consults a genre by id', () => {
    it('should return a genre', async () => {
      const genre: Genre = {
        name: 'Genre 1',
        is_active: true,
      };
      mockRepository.findOneById.mockReturnValue(genre);
      const result = await service.findOneById(id);
      expect(result).toEqual(genre);
    });
    it('should return a status code 404 if the genre is not found', async () => {
      mockRepository.findOneById.mockReturnValue(null);
      try {
        await service.findOneById(id);
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.response).toBe('Genre not found');
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

  describe('when the user creates a genre', () => {
    it('should create a genre', async () => {
      const genre: Genre = {
        name: 'Genre 1',
        is_active: true,
      };
      mockRepository.create.mockReturnValue(genre);
      const result = await service.create(genre);
      expect(result).toEqual(genre);
    });
  });

  describe('when the user updates a genre', () => {
    it('should update a genre', async () => {
      const bodyUpdate: UpdateGenreDto = {
        name: 'Sou-um-nome',
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
      expect(resultService).toEqual(result);
    });
    it('should return a status code 404 if the genre is not found', async () => {
      const result: UpdateWriteOpResult = {
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 0,
        acknowledged: true,
        upsertedId: null,
      };
      mockRepository.updateById.mockReturnValue(result);
      try {
        await service.updateById(id, {});
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.response).toBe('Genre not found');
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

  describe('when the user removes a genre by id', () => {
    it('should remove a genre', async () => {
      const result: UpdateWriteOpResult = {
        matchedCount: 1,
        modifiedCount: 1,
        upsertedCount: 0,
        acknowledged: true,
        upsertedId: null,
      };
      mockRepository.removeOneById.mockReturnValue(result);
      const resultService = await service.removeOneById(id);
      expect(resultService).toEqual(result);
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

  describe('when the user removes all genres', () => {
    it('should remove all genres', async () => {
      const result: UpdateWriteOpResult = {
        matchedCount: 1,
        modifiedCount: 1,
        upsertedCount: 0,
        acknowledged: true,
        upsertedId: null,
      };
      mockRepository.removeAll.mockReturnValue(result);
      const resultService = await service.removeAll();
      expect(resultService).toEqual(result);
    });
  });
});
