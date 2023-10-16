import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AnalysisArticle, ArticleDocument } from "./schemas/article.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class ArticlesRepository {
    constructor(@InjectModel(AnalysisArticle.name) private articleModel: Model<ArticleDocument>) {}

    async findOne(articleFilterQuery: FilterQuery<AnalysisArticle>): Promise<AnalysisArticle> {
        return this.articleModel.findOne(articleFilterQuery);
    }

    async find(articlesFilterQuery: FilterQuery<AnalysisArticle>): Promise<AnalysisArticle[]> {
        return this.articleModel.find(articlesFilterQuery);
    }

    async create(article: AnalysisArticle): Promise<AnalysisArticle> {
        const newArticle = new this.articleModel(article);
        return newArticle.save();
    }

    async findOneAndUpdate(articleFilterQuery: FilterQuery<AnalysisArticle>, article: Partial<AnalysisArticle>): Promise<AnalysisArticle> {
        return this.articleModel.findOneAndUpdate(articleFilterQuery, article);
    }    

    async remove(articleFilterQuery: FilterQuery<AnalysisArticle>): Promise<void> {
        await this.articleModel.deleteOne(articleFilterQuery);
    }
}