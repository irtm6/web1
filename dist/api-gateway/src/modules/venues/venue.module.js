"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const venue_controller_1 = require("./venue.controller");
const venue_service_1 = require("./venue.service");
let VenueModule = class VenueModule {
};
exports.VenueModule = VenueModule;
exports.VenueModule = VenueModule = __decorate([
    (0, common_1.Module)({
        controllers: [venue_controller_1.VenueController],
        providers: [
            venue_service_1.VenueService,
            {
                provide: 'VENUE_SERVICE',
                useFactory: () => microservices_1.ClientProxyFactory.create({
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: ['amqp://guest:guest@127.0.0.1:5672'],
                        queue: 'venue_queue', // назва черги для venue
                        queueOptions: { durable: false },
                    },
                }),
            },
        ],
    })
], VenueModule);
