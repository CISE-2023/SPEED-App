import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ArticleDocument = ModeratedArticle & Document;

@Schema()
export class ModeratedArticle {
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

export const ArticleSchema = SchemaFactory.createForClass(ModeratedArticle);