import { Controller, Get, Post, Body } from "@nestjs/common";
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

    @Post()
    async createArticle(@Body() createArticleDto: CreateArticleDto): Promise<AnalysisArticle> {
        return this.articlesService.createArticle(
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
}