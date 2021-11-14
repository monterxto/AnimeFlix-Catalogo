import { Module } from '@nestjs/common';
import { CastMembersService } from './cast-members.service';
import { CastMembersController } from './cast-members.controller';

@Module({
  controllers: [CastMembersController],
  providers: [CastMembersService]
})
export class CastMembersModule {}
