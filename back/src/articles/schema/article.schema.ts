import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ length: 200, unique: true })
  title: string;

  @Prop()
  userId: string;

  @Prop()
  moderation: boolean;

  @Prop(raw({}))
  data: Record<string, any>;

  @Prop()
  likes: string[];
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
