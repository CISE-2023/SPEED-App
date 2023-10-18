import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { AnalysisModule } from './analysis/articles.module';
import { ModerateModule } from './moderate/articles.module';
import { RejecteModule } from './reject/articles.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://group507:XzGzXcpaKJelTB2C@product-data.9a4dcil.mongodb.net/?retryWrites=true&w=majority'), 
  ArticlesModule, AnalysisModule, ModerateModule, RejecteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
