"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("./config");
const pack = require("../package.json");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.connectMicroservice({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: ['amqp://guest:guest@127.0.0.1:5672'],
                queue: 'user_queue',
                queueOptions: { durable: false },
            },
        }, { inheritAppConfig: true });
        yield app.startAllMicroservices();
        yield app.listen(config_1.configService.getPort());
        console.log(`User Service is running on http://localhost:3001`);
        console.log(config_1.configService.getBrockerUrl());
    });
}
bootstrap();
