import { Test, TestingModule } from '@nestjs/testing';
import { Video } from './entities/video.entity';
import { VideosRepository } from './repository/videos.repository';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import * as httpMock from 'node-mocks-http';
import { CreateVideoDto } from './dto/create-video.dto';
import { ExpressAdapter } from '@nestjs/platform-express';
import { UpdateWriteOpResult } from 'mongoose';
import { UpdateVideoDto } from './dto/update-video.dto';

describe('VideosController', () => {
  let controller: VideosController;
  let service: VideosService;
  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    updateById: jest.fn(),
    removeOneById: jest.fn(),
    removeAll: jest.fn(),
  };
  const id: string = '618ca7cee4bfae2412a72921';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [VideosService,
        {
          provide: VideosRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<VideosController>(VideosController);
    service = module.get<VideosService>(VideosService);
  });

  describe('when making a get request to return all videos', () => {
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
        },
        {
          title: 'Video 2',
          description: 'Description 2',
          categoriesId: [],
          genresId: [],
          duration: 20,
          rating: 'L',
          yearLaunched: 2020,
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => videos);
      const response = await controller.findAll(httpMock.createResponse());
      expect(response.statusCode).toBe(200);
      expect(response._getData()).toEqual(videos);
    });
  });

  describe('when making a post request to insert a video', () => {
    it('should return a status code 201 with the video inserted', async () => {
      const body: CreateVideoDto = {
        title: 'Video 1',
        description: 'Description 1',
        categoriesId: [],
        genresId: [],
        duration: 10,
        rating: 'L',
        yearLaunched: 2020,
        opened: true,
      };
      const resultService: Video = {
        title: 'Video 1',
        description: 'Description 1',
        categoriesId: [],
        genresId: [],
        duration: 10,
        rating: 'L',
        yearLaunched: 2020,
        opened: true,
      };
      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => resultService);

      const file: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'video.mp4',
        encoding: '7bit',
        mimetype: 'video/mp4',
        destination: '',
        filename: 'video.mp4',
        path: '',
        buffer: Buffer.from('video'),
        size: 0,
        stream: null,
      };
      expect(await controller.create(file, body)).toBe(resultService);
    });
  });

  describe('when making a get request to return one video by id', () => {
    it('should return a status code 200 with the video found', async () => {
      const resultService: Video = {
        title: 'Video 1',
        description: 'Description 1',
        categoriesId: [],
        genresId: [],
        duration: 10,
        rating: 'L',
        yearLaunched: 2020,
        opened: true,
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

  describe('when making a patch request to modify a video by id', () => {
    it('should return a status code 204 with the video updated', async () => {
      const bodyUpdate: UpdateVideoDto = {
        title: 'Video 1',
        description: 'Description 1',
        categoriesId: [],
        genresId: [],
        duration: 10,
        rating: 'L',
        yearLaunched: 2020,
        opened: true,
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

  describe('when making a delete request to delete a video by id', () => {
    it('should return a status code 204 with the video deleted', async () => {
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

  describe('when making a delete request to delete all videos', () => {
    it('should return a status code 204 with the all videos deleted', async () => {
      jest.spyOn(service, 'removeAll').mockImplementation(async () => null);
      const response = await controller.removeAll(httpMock.createResponse());
      expect(response.statusCode).toBe(204);
    });
  });
});

