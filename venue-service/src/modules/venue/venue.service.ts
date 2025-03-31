import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from '../../entities/venue.entity';
import { CreateVenueDto } from './dto/create-venue.dto';
import { AvailableSlot } from '../../entities/available-slot.entity';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UserDTO } from '../../../../user-service/src/modules/user/dto';

@Injectable()
export class VenueService {
    constructor(
        @InjectRepository(Venue) private readonly venueRepository: Repository<Venue>,
        @InjectRepository(AvailableSlot) private readonly slotRepository: Repository<AvailableSlot>,
    ) {}

    private checkAdminAccess(user: UserDTO) {
        if (user.role!=="Admin") {
            throw new ForbiddenException('Access denied. Admin privileges required.');
        }
    }

    async createVenue(user: UserDTO, dto: CreateVenueDto): Promise<Venue> {
        this.checkAdminAccess(user);
        const venue = this.venueRepository.create(dto);
        return await this.venueRepository.save(venue);
    }

    async getVenues(): Promise<Venue[]> {
        return await this.venueRepository.find();
    }

    async getVenueSlots(venueId: string): Promise<AvailableSlot[]> {
        return await this.slotRepository.find({ where: { venue: { id: venueId } } });
    }

    async createSlot(user: UserDTO, dto: CreateSlotDto): Promise<AvailableSlot> {
        this.checkAdminAccess(user);
        const venue = await this.venueRepository.findOne({ where: { id: dto.venueId } });
        if (!venue) throw new Error('Venue not found');

        const slot = this.slotRepository.create({ ...dto, venue });
        return await this.slotRepository.save(slot);
    }

    async updateSlot(user: UserDTO, slotId: string, dto: Partial<CreateSlotDto>): Promise<AvailableSlot> {
        this.checkAdminAccess(user);
        const slot = await this.slotRepository.findOne({ where: { id: slotId } });
        if (!slot) throw new Error('Slot not found');

        Object.assign(slot, dto);
        return await this.slotRepository.save(slot);
    }

    async deleteSlot(user: UserDTO, slotId: string): Promise<void> {
        this.checkAdminAccess(user);
        await this.slotRepository.delete(slotId);
    }
}