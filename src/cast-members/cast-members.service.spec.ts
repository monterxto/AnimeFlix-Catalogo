import { Test, TestingModule } from '@nestjs/testing';
import { CastMembersService } from './cast-members.service';

describe('CastMembersService', () => {
  let service: CastMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CastMembersService],
    }).compile();

    service = module.get<CastMembersService>(CastMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
