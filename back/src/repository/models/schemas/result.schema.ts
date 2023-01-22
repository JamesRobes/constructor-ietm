import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Answer, AnswerSchema } from './answer.schema';

export type ResultDocument = Result & Document;

@Schema({ _id: true, versionKey: false, timestamps: false })
export class Result{
    @Prop()
    TotalScore: number;

    @Prop()
    userID: number;

    @Prop()
    date: Date;

    @Prop({type: [AnswerSchema], default: []})
    answers: Answer[];
}

export const ResultSchema = SchemaFactory.createForClass(Result);