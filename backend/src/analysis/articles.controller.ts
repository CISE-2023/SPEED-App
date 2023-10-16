import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { AnalysisArticle } from "./schemas/article.schema";
import { CreateArticleDto } from "./dto/create-article.dto";

@Controller('analysis')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Get()
    async getArticles(): Promise<AnalysisArticle[]> {
        return this.articlesService.getArticles();
    }

    @Get('/:id')
    async getArticleById(@Param('id') id: string) {
        return this.articlesService.getArticleByID(id);
    } 

    @Post()
    async createArticle(@Body() createArticleDto: CreateArticleDto): Promise<AnalysisArticle> {
        return this.articlesService.createArticle(
            createArticleDto.id,
            createArticleDto.title, 
            createArticleDto.source, 
            createArticleDto.publication, 
            createArticleDto.author,
            createArticleDto.volume,
            createArticleDto.number,
            createArticleDto.doi,
            createArticleDto.comments,
            createArticleDto.seMethod,
            createArticleDto.claim,
            createArticleDto.evidence
        );
    }

    @Delete('/:id')
    async deleteArticle(@Param('id') id: string) {
        return this.articlesService.deleteArticle(id);
    }
}