"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var VenueService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const patterns_1 = require("../patterns");
let VenueService = VenueService_1 = class VenueService {
    constructor(venueClient) {
        this.venueClient = venueClient;
        this.logger = new common_1.Logger(VenueService_1.name);
    }
    send(pattern, data) {
        const res$ = this.venueClient.send(pattern, data).pipe((0, rxjs_1.timeout)(30000), (0, rxjs_1.catchError)((e) => {
            this.logger.error(e);
            return (0, rxjs_1.throwError)(() => e);
        }));
        return (0, rxjs_1.firstValueFrom)(res$);
    }
    checkAdminAccess(user) {
        if (user.role !== 'Admin') {
            throw new common_1.ForbiddenException('Access denied. Admin privileges required.');
        }
    }
    createVenue(role, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (role !== 'Admin') {
                throw new common_1.UnauthorizedException('Only admins can create venues');
            }
            // Тепер створюємо місце
            return this.send(patterns_1.patterns.VENUE.CREATE, { venue: dto });
        });
    }
    getAllVenues() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Getting all venues');
            return this.send(patterns_1.patterns.VENUE.GET_ALL, {});
        });
    }
    getVenueSlots(venueId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Getting slots for venue ${venueId}`);
            return this.send(patterns_1.patterns.VENUE.GET_SLOTS, { venueId });
        });
    }
    createSlot(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkAdminAccess(user);
            this.logger.log(`Creating slot for venue ${dto.venueId}`);
            return this.send(patterns_1.patterns.VENUE.CREATE_SLOT, { user, dto });
        });
    }
    updateSlot(user, slotId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkAdminAccess(user);
            this.logger.log(`Updating slot with id: ${slotId}`);
            return this.send(patterns_1.patterns.VENUE.UPDATE_SLOT, { user, slotId, dto });
        });
    }
    deleteSlot(user, slotId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkAdminAccess(user);
            this.logger.log(`Deleting slot with id: ${slotId}`);
            return this.send(patterns_1.patterns.VENUE.DELETE_SLOT, { user, slotId });
        });
    }
};
exports.VenueService = VenueService;
exports.VenueService = VenueService = VenueService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)('VENUE_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], VenueService);
