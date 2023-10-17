import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { AnalysisArticle, AnalysisSchema } from "./schemas/article.schema";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { ArticlesRepository } from "./articles.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: AnalysisArticle.name, schema: AnalysisSchema }])],
    controllers: [ArticlesController],
    providers: [ArticlesService, ArticlesRepository]
})

export class AnalysisModule {}