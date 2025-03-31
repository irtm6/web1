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
var VenueController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const venue_service_1 = require("./venue.service");
const patterns_1 = require("../patterns");
let VenueController = VenueController_1 = class VenueController {
    constructor(venueService) {
        this.venueService = venueService;
        this.logger = new common_1.Logger(VenueController_1.name);
    }
    createVenue(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user, dto }) {
            this.logger.log('Creating venue');
            return this.venueService.createVenue(user, dto);
        });
    }
    getVenues() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Fetching all venues');
            return this.venueService.getVenues();
        });
    }
    getVenueSlots(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Fetching slots for venue ID: ${id}`);
            return this.venueService.getVenueSlots(id);
        });
    }
    // ----------- Управління слотами -----------
    createSlot(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user, dto }) {
            this.logger.log('Creating slot');
            return this.venueService.createSlot(user, dto);
        });
    }
    updateSlot(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user, slotId, dto }) {
            this.logger.log(`Updating slot ${slotId}`);
            return this.venueService.updateSlot(user, slotId, dto);
        });
    }
    deleteSlot(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user, slotId }) {
            this.logger.log(`Deleting slot ${slotId}`);
            return this.venueService.deleteSlot(user, slotId);
        });
    }
};
exports.VenueController = VenueController;
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.VENUE.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "createVenue", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.VENUE.GET_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "getVenues", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.VENUE.GET_SLOTS),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "getVenueSlots", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.VENUE.CREATE_SLOT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "createSlot", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.VENUE.UPDATE_SLOT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "updateSlot", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_1.patterns.VENUE.DELETE_SLOT),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "deleteSlot", null);
exports.VenueController = VenueController = VenueController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [venue_service_1.VenueService])
], VenueController);
