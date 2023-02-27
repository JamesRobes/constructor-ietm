import { Module } from '@nestjs/common';
import { EditCommentsService } from './edit-comments.service';
import { EditCommentsController } from './edit-comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EditComment, EditCommentSchema } from './schema/edit-comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EditComment.name, schema: EditCommentSchema },
    ]),
  ],
  controllers: [EditCommentsController],
  providers: [EditCommentsService],
})
export class EditCommentsModule {}
