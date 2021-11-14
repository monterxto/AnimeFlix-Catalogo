import { Test, TestingModule } from '@nestjs/testing';
import { Genre } from './entities/genre.entity';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { GenresRepository } from './repository/genres.repository';
import * as httpMock from 'node-mocks-http';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { UpdateWriteOpResult } from 'mongoose';

describe('GenresController', () => {
  let controller: GenresController;
  let service: GenresService;
  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    updateById: jest.fn(),
    removeOneById: jest.fn(),
    removeAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [
        GenresService,
        {
          provide: GenresRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<GenresController>(GenresController);
    service = module.get<GenresService>(GenresService);
  });

  beforeEach(() => {
    mockRepository.create.mockReset();
    mockRepository.findAll.mockReset();
    mockRepository.findOneById.mockReset();
    mockRepository.removeOneById.mockReset();
    mockRepository.updateById.mockReset();
  });

  describe('when making a get request to return all genres', () => {
    it('should return all genres', async () => {
      const mockGenres: Genre[] = [
        {
          name: 'test',
          is_active: true,
          categoriesId: [],
        },
      ];

      mockRepository.findAll.mockResolvedValue(mockGenres);
      const response = await controller.findAll(httpMock.createResponse());
      expect(response.statusCode).toBe(200);
      expect(response._getData()).toEqual(mockGenres);
    });
  });

  describe('when making a post request to insert a genres', () => {
    it('should return a status code 201 with the genre inserted', async () => {
      const body: CreateGenreDto = {
        name: 'Sou-um-nome',
        is_active: true,
        categoriesId: [],
      };
      const resultService: Genre = {
        name: 'Sou-um-nome',
        is_active: true,
        categoriesId: [],
      };
      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => resultService);
      expect(await controller.create(body)).toBe(resultService);
    });
  });

  describe('when making a get request to return one genre by id', () => {
    it('should return a status code 200 with the genre found', async () => {
      const id = '618afa3a587a29f7445d386f';
      const resultService: Genre = {
        name: 'Sou-um-nome',
        is_active: true,
        categoriesId: [],
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

  describe('when making a patch request to modify a genre by id', () => {
    it('should return a 204 status code if update successfully', async () => {
      const id = '618afa3a587a29f7445d386f';
      const bodyUpdate: UpdateGenreDto = {
        name: 'Sou-um-nome',
        is_active: true,
      };
      const resultService: UpdateWriteOpResult = {
        matchedCount: 1,
        modifiedCount: 1,
        upsertedCount: 0,
        acknowledged: true,
        upsertedId: null,
      };
      jest
        .spyOn(service, 'updateById')
        .mockImplementation(async () => resultService);
      const response = await controller.updateById(
        id,
        bodyUpdate,
        httpMock.createResponse(),
      );
      expect(response.statusCode).toBe(204);
    });
  });

  describe('when making a delete request to delete a genre by id', () => {
    it('should return a 204 status code if the genre was successfully deleted', async () => {
      const id = '618afa3a587a29f7445d386f';
      const resultService: boolean = true;
      jest
        .spyOn(service, 'removeOneById')
        .mockImplementation(async () => resultService);
      const response = await controller.removeOneById(
        id,
        httpMock.createResponse(),
      );
      expect(response.statusCode).toBe(204);
    });
  });

  describe('when making a delete request to delete all genres', () => {
    it('should return a 204 status code if the all genre was successfully deleted', async () => {
      jest.spyOn(service, 'removeAll').mockImplementation(async () => null);
      const response = await controller.removeAll(httpMock.createResponse());
      expect(response.statusCode).toBe(204);
    });
  });
});
