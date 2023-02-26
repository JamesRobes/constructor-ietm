import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KnowledgeUsersService } from './knowledge-users.service';
import { CreateKnowledgeUserDto } from './dto/create-knowledge-user.dto';
import { UpdateKnowledgeUserDto } from './dto/update-knowledge-user.dto';

@Controller('knowledge-users')
export class KnowledgeUsersController {
  constructor(private readonly knowledgeUsersService: KnowledgeUsersService) {}

  @Post()
  create(@Body() createKnowledgeUserDto: CreateKnowledgeUserDto) {
    return this.knowledgeUsersService.create(createKnowledgeUserDto);
  }

  @Get()
  findAll() {
    return this.knowledgeUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.knowledgeUsersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKnowledgeUserDto: UpdateKnowledgeUserDto,
  ) {
    return this.knowledgeUsersService.update(id, updateKnowledgeUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.knowledgeUsersService.remove(id);
  }
}
