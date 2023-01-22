import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema ({_id: true, versionKey: false, timestamps: false})
export class Answer{
    @Prop()
    text: string;

    @Prop()
    questionID: number;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer); 