import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { AnalysisModule } from './analysis/articles.module';
import { ModerateModule } from './moderate/articles.module';
import { RejecteModule } from './reject/articles.module';

require('dotenv').config();
const db = process.env.MONGO_URI;

@Module({
  imports: [MongooseModule.forRoot(db), 
  ArticlesModule, AnalysisModule, ModerateModule, RejecteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
