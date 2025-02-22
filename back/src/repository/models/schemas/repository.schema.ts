import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  Participant,
  ParticipantSchema,
} from 'src/team/models/schemas/participant.schema';
import {
  AnnotationGroup,
  AnnotationGroupSchema,
} from './annotation-group.schema';
import { Instruction, InstructionSchema } from './instruction.schema';
import { Model, ModelSchema } from './model.schema';
import { SceneSettings, SceneSettingsSchema } from './scene-settings.schema';
import { Test, TestSchema } from './test.schema';

export type RepositoryDocument = Repository & Document;

@Schema({ timestamps: true })
export class Repository {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Team', default: null })
  team: Types.ObjectId;

  @Prop({ length: 200, unique: true })
  title: string;

  @Prop()
  type: RepositoryType;

  @Prop({ default: null })
  description: string;

  @Prop({ default: null })
  preview: string;

  @Prop({ type: [ParticipantSchema], default: [] })
  participants: Participant[];

  @Prop({ type: [ModelSchema], default: [] })
  models: Model[];

  @Prop({type: [TestSchema], default: []})
  tests: Test[];

  @Prop({ type: [InstructionSchema], default: [] })
  instructions: Instruction[];

  @Prop({ type: [AnnotationGroupSchema], default: [] })
  annotationGroups: AnnotationGroup[];

  @Prop({ type: Object, default: null })
  modelTree: any;

  @Prop({ type: SceneSettingsSchema, default: null })
  sceneSettings: SceneSettings;
}
export const RepositorySchema = SchemaFactory.createForClass(Repository);

export enum RepositoryType {
  Public,
  Private,
}
