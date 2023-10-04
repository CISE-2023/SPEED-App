import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
    @Prop()
    title: string;

    @Prop()
    seMethod: string;

    @Prop()
    claim: string;

    @Prop()
    comments: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);