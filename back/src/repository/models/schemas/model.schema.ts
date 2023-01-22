import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Test, TestSchema } from './test.schema';

export type ModelDocument = Model & Document;

@Schema({ versionKey: false })
export class Model {
  @Prop({ length: 200 })
  name: string;

  @Prop()
  type: ModelType;

  @Prop()
  filename: string;

  @Prop()
  path: string;

  @Prop({type: [TestSchema], default: []})
  tests: Test[];
}

export const ModelSchema = SchemaFactory.createForClass(Model);

export enum ModelType {
  Primary,
  Animation,
}
