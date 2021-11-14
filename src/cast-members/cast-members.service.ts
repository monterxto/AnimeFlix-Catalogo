import { Injectable } from '@nestjs/common';
import { CreateCastMemberDto } from './dto/create-cast-member.dto';
import { UpdateCastMemberDto } from './dto/update-cast-member.dto';

@Injectable()
export class CastMembersService {
  create(createCastMemberDto: CreateCastMemberDto) {
    return 'This action adds a new castMember';
  }

  findAll() {
    return `This action returns all castMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} castMember`;
  }

  update(id: number, updateCastMemberDto: UpdateCastMemberDto) {
    return `This action updates a #${id} castMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} castMember`;
  }
}
