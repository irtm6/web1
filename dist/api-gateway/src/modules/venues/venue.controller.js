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
const venue_service_1 = require("./venue.service");
let VenueController = VenueController_1 = class VenueController {
    constructor(venueService) {
        this.venueService = venueService;
        this.logger = new common_1.Logger(VenueController_1.name);
    }
    createVenue(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Received request to create venue: ${JSON.stringify(body)}`);
            if (!body.role || !body.venue) {
                throw new common_1.BadRequestException('Invalid request: role and venue data are required');
            }
            return this.venueService.createVenue(body.role, body.venue);
        });
    }
    getVenues() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Getting all venues');
            try {
                return yield this.venueService.getAllVenues();
            }
            catch (error) {
                this.logger.error('Error getting venues', error);
                throw error;
            }
        });
    }
    getVenueSlots(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Getting slots for venue with id: ${id}`);
            try {
                return yield this.venueService.getVenueSlots(id);
            }
            catch (error) {
                this.logger.error('Error getting venue slots', error);
                throw error;
            }
        });
    }
    // ----------------- Управління слотами -----------------
    createSlot(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user, dto }) {
            this.logger.log(`Creating slot for venue with id: ${dto.venueId}`);
            try {
                return yield this.venueService.createSlot(user, dto);
            }
            catch (error) {
                this.logger.error('Error creating slot', error);
                throw error;
            }
        });
    }
    updateSlot(slotId_1, _a) {
        return __awaiter(this, arguments, void 0, function* (slotId, { user, dto }) {
            this.logger.log(`Updating slot with id: ${slotId}`);
            try {
                return yield this.venueService.updateSlot(user, slotId, dto);
            }
            catch (error) {
                this.logger.error('Error updating slot', error);
                throw error;
            }
        });
    }
    deleteSlot(slotId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Deleting slot with id: ${slotId}`);
            try {
                return yield this.venueService.deleteSlot(user, slotId);
            }
            catch (error) {
                this.logger.error('Error deleting slot', error);
                throw error;
            }
        });
    }
};
exports.VenueController = VenueController;
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "createVenue", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "getVenues", null);
__decorate([
    (0, common_1.Get)(':id/slots'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "getVenueSlots", null);
__decorate([
    (0, common_1.Post)('slots'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "createSlot", null);
__decorate([
    (0, common_1.Patch)('slots/:slotId'),
    __param(0, (0, common_1.Param)('slotId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "updateSlot", null);
__decorate([
    (0, common_1.Delete)('slots/:slotId'),
    __param(0, (0, common_1.Param)('slotId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VenueController.prototype, "deleteSlot", null);
exports.VenueController = VenueController = VenueController_1 = __decorate([
    (0, common_1.Controller)('venues'),
    __metadata("design:paramtypes", [venue_service_1.VenueService])
], VenueController);
