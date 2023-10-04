import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Article, ArticleDocument } from "./schemas/article.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class ArticlesRepository {
    constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

    async findOne(articleFilterQuery: FilterQuery<Article>): Promise<Article> {
        return this.articleModel.findOne(articleFilterQuery);
    }

    async find(articlesFilterQuery: FilterQuery<Article>): Promise<Article[]> {
        return this.articleModel.find(articlesFilterQuery);
    }

    async create(article: Article): Promise<Article> {
        const newArticle = new this.articleModel(article);
        return newArticle.save();
    }

    async findOneAndUpdate(articleFilterQuery: FilterQuery<Article>, article: Partial<Article>): Promise<Article> {
        return this.articleModel.findOneAndUpdate(articleFilterQuery, article);
    }
}