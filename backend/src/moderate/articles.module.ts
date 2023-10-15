import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { ModeratedArticle, ArticleSchema } from "./schemas/article.schema";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { ArticlesRepository } from "./articles.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: ModeratedArticle.name, schema: ArticleSchema }])],
    controllers: [ArticlesController],
    providers: [ArticlesService, ArticlesRepository]
})

export class ModerateModule {}