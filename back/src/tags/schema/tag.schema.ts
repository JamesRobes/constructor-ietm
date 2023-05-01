import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from '../../categories/schema/category.schema';

export type TagDocument = Tag & mongoose.Document;

@Schema({ timestamps: true })
export class Tag {
  @Prop({ length: 200, unique: true })
  name: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
TagSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
TagSchema.set('toJSON', { virtuals: true });
