import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { GenresModule } from './genres/genres.module';
import { VideosModule } from './videos/videos.module';
import { CastMembersModule } from './cast-members/cast-members.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'storage'),
      serveRoot: '/storage',
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
    MongooseModule.forRoot('mongodb://db/local', {
      user: process.env.USER_DB,
      pass: process.env.PASS_DB,
      authSource: 'admin',
    }),
    CategoriesModule,
    GenresModule,
    VideosModule,
    CastMembersModule,
  ],
})
export class AppModule {}
