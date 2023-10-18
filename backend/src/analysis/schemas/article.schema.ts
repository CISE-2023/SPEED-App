import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ArticleDocument = AnalysisArticle & Document;

@Schema()
export class AnalysisArticle {
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

    @Prop()
    seMethod: string;

    @Prop()
    claim: string;

    @Prop()
    evidence: string;
}

export const AnalysisSchema = SchemaFactory.createForClass(AnalysisArticle);