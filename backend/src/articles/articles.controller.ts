import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
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

    @Get('/:id')
    async getArticleById(@Param('id') id: string) {
        return this.articlesService.getArticleByID(id);
    } 

    @Post()
    async createArticle(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
        return this.articlesService.createArticle(
            createArticleDto.id,
            createArticleDto.title, 
            createArticleDto.source, 
            createArticleDto.publication, 
            createArticleDto.author,
            createArticleDto.volume,
            createArticleDto.number,
            createArticleDto.doi,
            createArticleDto.comments
        );
    }

    @Delete('/:id')
    async deleteArticle(@Param('id') id: string) {
        return this.articlesService.deleteArticle(id);
    }
}