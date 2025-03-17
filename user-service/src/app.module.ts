import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ModulesModule} from './modules/modules.module';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "node:process";


@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env'
      }),
      ModulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
