import { PartialType } from '@nestjs/mapped-types';
import { CreateKnowledgeUserDto } from './create-knowledge-user.dto';

export class UpdateKnowledgeUserDto extends PartialType(
  CreateKnowledgeUserDto,
) {
  userId: never;
}
