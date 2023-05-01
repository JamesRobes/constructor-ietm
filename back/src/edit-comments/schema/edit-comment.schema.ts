import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/models/schemas/user.schema';
import { Article } from '../../articles/schema/article.schema';

export type EditCommentDocument = EditComment & mongoose.Document;

@Schema()
export class EditComment {
  @Prop({
    required: true,
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  author: User;

  @Prop({ required: true })
  text: string;

  @Prop({
    required: true,
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
  })
  article: Article;
}

export const EditCommentSchema = SchemaFactory.createForClass(EditComment);
EditCommentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
EditCommentSchema.set('toJSON', { virtuals: true });
