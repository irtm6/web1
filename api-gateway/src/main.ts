import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport} from "@nestjs/microservices";
import amqp from "amqp-connection-manager";
import * as process from "node:process";


const pack = require("../package.json");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@127.0.0.1:5672'],
      queue: 'api_queue',
      queueOptions: {durable: false},


    }
  })
  await app.startAllMicroservices();
  await app.listen(3000);
  console.log(`API Gateway is running on http://localhost:3000`);
}
bootstrap();
