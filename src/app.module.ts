import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_HOST } from './constants/mongo.constant';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env` }),
    UsersModule,
    MongooseModule.forRoot(MONGO_HOST),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
