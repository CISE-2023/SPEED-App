import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ArticleDocument = RejectedArticle & Document;

@Schema()
export class RejectedArticle {
    @Prop()
    id: string; 
    
    @Prop()
    title: string;

    @Prop()
    source: string;

    @Prop()
    publication: number;

    @Prop()
    author: string;

    @Prop()
    volume: string;

    @Prop()
    number: number;

    @Prop()
    doi: string;

    @Prop()
    comments: string;
}

export const ArticleSchema = SchemaFactory.createForClass(RejectedArticle);