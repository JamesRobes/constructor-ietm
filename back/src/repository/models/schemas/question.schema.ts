import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({_id: true, versionKey: false, timestamps: false })
export class Question {
    @Prop()
    type: QuestionType;

    @Prop()
    modelID: string;

    @Prop()
    modelNameByUser: string;

    @Prop()
    body: string;

    @Prop()
    correctAnswer: string;
    
    @Prop()
    header: string;

}

export const QuestionSchema = SchemaFactory.createForClass(Question);

export enum QuestionType {
    FindAPart,
    WhatAPart,
    OneOfThree
}