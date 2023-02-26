import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ length: 200, unique: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});
CategorySchema.set('toJSON', { virtuals: true });
