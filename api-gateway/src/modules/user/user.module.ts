import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport, RmqOptions } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: 'USER_SERVICE',
            useFactory: () =>
                ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: ['amqp://guest:guest@127.0.0.1:5672'],
                        queue: 'user_queue',
                        queueOptions: {durable: false},
                    },
                }as RmqOptions,),

        },
        ]
})
export class UserModule {}