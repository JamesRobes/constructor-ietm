import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from '../../categories/schema/category.schema';
import { User } from '../../user/models/schemas/user.schema';

export type KnowledgeUserDocument = KnowledgeUser & mongoose.Document;

@Schema()
export class KnowledgeUser {
  @Prop({
    required: true,
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({ required: true })
  mainAdmin: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categoriesAdmin: Category[];
}

export const KnowledgeUserSchema = SchemaFactory.createForClass(KnowledgeUser);
KnowledgeUserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
KnowledgeUserSchema.set('toJSON', { virtuals: true });
