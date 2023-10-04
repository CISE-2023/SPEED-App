import { Injectable } from "@nestjs/common";
import { ArticlesRepository } from "./articles.repository";
import { Article } from "./schemas/article.schema";

@Injectable()
export class ArticlesService {
    constructor(private readonly articlesRepository: ArticlesRepository) {}

    async getArticles(): Promise<Article[]> {
        return this.articlesRepository.find({});
    }

    async createArticle(title: string, source: string, publication: number, author: string, volume: string, number: number, doi: string, comments: string): 
    Promise<Article> {
        return this.articlesRepository.create({
            title,
            source,
            publication,
            author,
            volume,
            number,
            doi,
            comments,
        });
    }
    
}