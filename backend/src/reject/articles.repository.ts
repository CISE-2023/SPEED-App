import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RejectedArticle, ArticleDocument } from "./schemas/article.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class ArticlesRepository {
    constructor(@InjectModel(RejectedArticle.name) private articleModel: Model<ArticleDocument>) {}

    async findOne(articleFilterQuery: FilterQuery<RejectedArticle>): Promise<RejectedArticle> {
        return this.articleModel.findOne(articleFilterQuery);
    }

    async find(articlesFilterQuery: FilterQuery<RejectedArticle>): Promise<RejectedArticle[]> {
        return this.articleModel.find(articlesFilterQuery);
    }

    async create(article: RejectedArticle): Promise<RejectedArticle> {
        const newArticle = new this.articleModel(article);
        return newArticle.save();
    }

    async findOneAndUpdate(articleFilterQuery: FilterQuery<RejectedArticle>, article: Partial<RejectedArticle>): Promise<RejectedArticle> {
        return this.articleModel.findOneAndUpdate(articleFilterQuery, article);
    }

    async remove(articleFilterQuery: FilterQuery<RejectedArticle>): Promise<void> {
        await this.articleModel.deleteOne(articleFilterQuery);
    }
}