import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { configService } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [configService.getBrockerUrl()],
            queue: 'venue_queue',
            queueOptions: { durable: false },
        },
    }, { inheritAppConfig: true });

    await app.startAllMicroservices();
    await app.listen(configService.getPort());

    console.log(`Venue Service is running on http://localhost:${configService.getPort()}`);
    console.log(`Connected to broker at: ${configService.getBrockerUrl()}`);
}

bootstrap();
