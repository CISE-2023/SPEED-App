import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ModeratedArticle, ArticleDocument } from "./schemas/article.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class ArticlesRepository {
    constructor(@InjectModel(ModeratedArticle.name) private articleModel: Model<ArticleDocument>) {}

    async findOne(articleFilterQuery: FilterQuery<ModeratedArticle>): Promise<ModeratedArticle> {
        return this.articleModel.findOne(articleFilterQuery);
    }

    async find(articlesFilterQuery: FilterQuery<ModeratedArticle>): Promise<ModeratedArticle[]> {
        return this.articleModel.find(articlesFilterQuery);
    }

    async create(article: ModeratedArticle): Promise<ModeratedArticle> {
        const newArticle = new this.articleModel(article);
        return newArticle.save();
    }

    async findOneAndUpdate(articleFilterQuery: FilterQuery<ModeratedArticle>, article: Partial<ModeratedArticle>): Promise<ModeratedArticle> {
        return this.articleModel.findOneAndUpdate(articleFilterQuery, article);
    }

    async remove(articleFilterQuery: FilterQuery<ModeratedArticle>): Promise<void> {
        await this.articleModel.deleteOne(articleFilterQuery);
    }
}