import { Test, TestingModule } from '@nestjs/testing';
import { UpdateWriteOpResult } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { VideosRepository } from './repository/videos.repository';
import { VideosService } from './videos.service';

describe('VideosService', () => {
  let service: VideosService;
  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    updateById: jest.fn(),
    removeOneById: jest.fn(),
    removeAll: jest.fn(),
  };
  const id: string = '6190877733a3d9fd0dbcdd58';
  const idInvalid: string = 'invalid';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideosService,
        {
          provide: VideosRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<VideosService>(VideosService);
  });

  describe('when the user consults all videos', () => {
    it('should return all videos', async () => {
      const videos: Video[] = [
        {
          title: 'Video 1',
          description: 'Description 1',
          categoriesId: [],
          genresId: [],
          duration: 10,
          rating: 'L',
          yearLaunched: 2020,
          opened: true,
        }
      ];

      mockRepository.findAll.mockReturnValue(videos);

      const result = await service.findAll();

      expect(result).toEqual(videos);
    });
  });

  describe('when the user creates a video', () => {
    it('should create a video', async () => {
      const video: CreateVideoDto = {
        title: 'Video 1',
        description: 'Description 1',
        categoriesId: [],
        genresId: [],
        duration: 10,
        rating: 'L',
        yearLaunched: 2020,
        opened: true,
      };

      mockRepository.create.mockReturnValue(video);

      const result = await service.create(video, null);

      expect(result).toEqual(video);
    });
  });

  describe('when the user consults a video by id', () => {
    it('should return a video', async () => {
      const video: Video = {
        title: 'Video 1',
        description: 'Description 1',
        categoriesId: [],
        genresId: [],
        duration: 10,
        rating: 'L',
        yearLaunched: 2020,
        opened: true,
      };

      mockRepository.findOneById.mockReturnValue(video);

      const result = await service.findOneById(id);

      expect(result).toEqual(video);
    });

    it('should return a status code 404 if the video is not found', async () => {
      mockRepository.findOneById.mockReturnValue(null);

      try {
        await service.findOneById(id);
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.response).toBe('Video not found');
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

  describe('when the user updates a video', () => {
    it('should update a video', async () => {
      const bodyUpdate: UpdateVideoDto = {
        title: 'Sou-um-nome',
        description: 'Sou-um-nome',
        categoriesId: [],
        genresId: [],
        duration: 10,
        rating: 'L',
        yearLaunched: 2020,
        opened: true,
      };
      const result: UpdateWriteOpResult = {
        matchedCount: 1,
        modifiedCount: 1,
        upsertedCount: 0,
        acknowledged: true,
        upsertedId: null,
      };
      const resultFindOneById: Video = {
        title: 'Sou-um-nome',
        description: 'Sou-um-nome',
        categoriesId: [],
        genresId: [],
        duration: 10,
        rating: 'L',
        yearLaunched: 2020,
        opened: true,
      };
      mockRepository.findOneById.mockReturnValue(resultFindOneById);
      mockRepository.updateById.mockReturnValue(result);
      const resultService = await service.updateById(id, bodyUpdate, null);
      expect(resultService).toEqual(result);
    });
    it('should return a status code 404 if the video is not found', async () => {
      const result: UpdateWriteOpResult = {
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 0,
        acknowledged: true,
        upsertedId: null,
      };
      mockRepository.updateById.mockReturnValue(result);
      try {
        await service.updateById(id, {}, null);
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.response).toBe('Video not found');
      }
    });
    it('should return a status code 400 if the id is invalid', async () => {
      try {
        await service.updateById(idInvalid, {}, null);
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.response).toBe('Invalid id');
      }
    });
  });

  describe('when the user removes a video by id', () => {
    it('should remove a video', async () => {
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

  describe('when the user removes all videos', () => {
    it('should remove all videos', async () => {
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
