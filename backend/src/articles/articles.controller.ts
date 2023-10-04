import { Controller, Get, Post, Body } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { Article } from "./schemas/article.schema";
import { CreateArticleDto } from "./dto/create-article.dto";

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Get()
    async getArticles(): Promise<Article[]> {
        return this.articlesService.getArticles();
    }

    @Post()
    async createArticle(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
        return this.articlesService.createArticle(createArticleDto.title, createArticleDto.seMethod, createArticleDto.claim, createArticleDto.comments);
    }
}