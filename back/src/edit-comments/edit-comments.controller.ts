import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EditCommentsService } from './edit-comments.service';
import { CreateEditCommentDto } from './dto/create-edit-comment.dto';
import { UpdateEditCommentDto } from './dto/update-edit-comment.dto';

@Controller('edit-comments')
export class EditCommentsController {
  constructor(private readonly editCommentsService: EditCommentsService) {}

  @Post()
  create(@Body() createEditCommentDto: CreateEditCommentDto) {
    return this.editCommentsService.create(createEditCommentDto);
  }

  @Get()
  findAll() {
    return this.editCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.editCommentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEditCommentDto: UpdateEditCommentDto,
  ) {
    return this.editCommentsService.update(id, updateEditCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.editCommentsService.remove(id);
  }
}
