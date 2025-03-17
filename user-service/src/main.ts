import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport} from "@nestjs/microservices";
import {configService} from "./config";

const pack = require ("../package.json");
async function bootstrap() {
 const app = await NestFactory.create(AppModule);

 app.connectMicroservice({
     transport: Transport.RMQ,
     options: {
         urls: ['amqp://guest:guest@127.0.0.1:5672'],
         queue: 'user_queue',
         queueOptions: {durable: false},

     },
 },
     {inheritAppConfig: true},
 );

 await app.startAllMicroservices();
 await app.listen(configService.getPort());
 console.log(`User Service is running on http://localhost:3001`);
 console.log(configService.getBrockerUrl())
}
bootstrap();
