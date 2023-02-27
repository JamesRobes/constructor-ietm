import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/models/schemas/user.schema';
import { Category } from '../../categories/schema/category.schema';

export type ArticleDocument = Article & mongoose.Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ length: 200, unique: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  moderation: boolean;

  @Prop(raw({}))
  data: Record<string, any>;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  likes: User[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
ArticleSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
ArticleSchema.set('toJSON', { virtuals: true });

export interface IPostData {
  time: number;
  blocks: (IHeaderBlock | IParagraphBlock)[];
  version: string;
}

export interface IHeaderBlock {
  id: string;
  type: 'header';
  data: {
    text: string;
    level: number;
  };
}

export interface IParagraphBlock {
  id: string;
  type: 'paragraph';
  data: {
    text: string;
  };
}
