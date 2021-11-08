import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db/local', {
      user: process.env.USER_DB,
      pass: process.env.PASS_DB,
      authSource: 'admin',
    }),
    CategoriesModule,
    GenresModule,
  ],
})
export class AppModule {}
