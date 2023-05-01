import { PartialType } from '@nestjs/mapped-types';
import { CreateEditCommentDto } from './create-edit-comment.dto';

export class UpdateEditCommentDto extends PartialType(CreateEditCommentDto) {
  authorId?: never;
  articleId?: never;
}
