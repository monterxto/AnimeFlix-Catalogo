import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CastMembersService } from './cast-members.service';
import { CreateCastMemberDto } from './dto/create-cast-member.dto';
import { UpdateCastMemberDto } from './dto/update-cast-member.dto';

@Controller('cast-members')
export class CastMembersController {
  constructor(private readonly castMembersService: CastMembersService) {}

  @Post()
  create(@Body() createCastMemberDto: CreateCastMemberDto) {
    return this.castMembersService.create(createCastMemberDto);
  }

  @Get()
  findAll() {
    return this.castMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.castMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCastMemberDto: UpdateCastMemberDto) {
    return this.castMembersService.update(+id, updateCastMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.castMembersService.remove(+id);
  }
}
