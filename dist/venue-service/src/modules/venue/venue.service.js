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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const venue_entity_1 = require("../../entities/venue.entity");
const available_slot_entity_1 = require("../../entities/available-slot.entity");
let VenueService = class VenueService {
    constructor(venueRepository, slotRepository) {
        this.venueRepository = venueRepository;
        this.slotRepository = slotRepository;
    }
    checkAdminAccess(user) {
        if (user.role !== "Admin") {
            throw new common_1.ForbiddenException('Access denied. Admin privileges required.');
        }
    }
    createVenue(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkAdminAccess(user);
            const venue = this.venueRepository.create(dto);
            return yield this.venueRepository.save(venue);
        });
    }
    getVenues() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.venueRepository.find();
        });
    }
    getVenueSlots(venueId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.slotRepository.find({ where: { venue: { id: venueId } } });
        });
    }
    createSlot(user, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkAdminAccess(user);
            const venue = yield this.venueRepository.findOne({ where: { id: dto.venueId } });
            if (!venue)
                throw new Error('Venue not found');
            const slot = this.slotRepository.create(Object.assign(Object.assign({}, dto), { venue }));
            return yield this.slotRepository.save(slot);
        });
    }
    updateSlot(user, slotId, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkAdminAccess(user);
            const slot = yield this.slotRepository.findOne({ where: { id: slotId } });
            if (!slot)
                throw new Error('Slot not found');
            Object.assign(slot, dto);
            return yield this.slotRepository.save(slot);
        });
    }
    deleteSlot(user, slotId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkAdminAccess(user);
            yield this.slotRepository.delete(slotId);
        });
    }
};
exports.VenueService = VenueService;
exports.VenueService = VenueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(venue_entity_1.Venue)),
    __param(1, (0, typeorm_1.InjectRepository)(available_slot_entity_1.AvailableSlot)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VenueService);
