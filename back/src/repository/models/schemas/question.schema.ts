import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({_id: true, versionKey: false, timestamps: false })
export class Question {
    @Prop()
    type: QuestionType;

    @Prop()
    answer: string;

    @Prop()
    modelID: string;

    @Prop()
    score: number;

    @Prop()
    header: string;

    @Prop()
    body: string;

}

export const QuestionSchema = SchemaFactory.createForClass(Question);

export enum QuestionType {
    FindAPart,
    WhatAPart,
    InsertNameOfPart
}