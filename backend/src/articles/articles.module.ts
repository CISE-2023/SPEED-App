import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { Article, ArticleSchema } from "./schemas/article.schema";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { ArticlesRepository } from "./articles.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
    controllers: [ArticlesController],
    providers: [ArticlesService, ArticlesRepository]
})

export class ArticlesModule {}