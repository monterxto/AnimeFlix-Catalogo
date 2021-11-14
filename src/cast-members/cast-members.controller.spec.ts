import { Test, TestingModule } from '@nestjs/testing';
import { CastMembersController } from './cast-members.controller';
import { CastMembersService } from './cast-members.service';

describe('CastMembersController', () => {
  let controller: CastMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CastMembersController],
      providers: [CastMembersService],
    }).compile();

    controller = module.get<CastMembersController>(CastMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
