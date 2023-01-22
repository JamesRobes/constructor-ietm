import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question, QuestionSchema } from './question.schema';
import { Result, ResultSchema } from './result.schema';

export type TestDocument = Test & Document;

@Schema({_id: true, versionKey: false, timestamps: false})
export class Test{
    @Prop()
    name: string;

    @Prop({ type: [QuestionSchema], default: []})
    questions: Question[];

    @Prop({type: [ResultSchema], default: []})
    results: Result[];
}

export const TestSchema = SchemaFactory.createForClass(Test);