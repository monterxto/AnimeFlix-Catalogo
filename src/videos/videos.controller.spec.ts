import { Test, TestingModule } from '@nestjs/testing';
import { VideosRepository } from './repository/videos.repository';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

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
  });

  beforeEach(() => {
    mockRepository.create.mockReset();
    mockRepository.findAll.mockReset();
    mockRepository.findOneById.mockReset();
    mockRepository.removeOneById.mockReset();
    mockRepository.updateById.mockReset();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

