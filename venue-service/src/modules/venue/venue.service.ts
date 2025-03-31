import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from '../../entities/venue.entity';
import { CreateVenueDto } from './dto/create-venue.dto';
import { AvailableSlot } from '../../entities/available-slot.entity';
import { CreateSlotDto } from './dto/create-slot.dto';

@Injectable()
export class VenueService {
    constructor(
        @InjectRepository(Venue) private readonly venueRepository: Repository<Venue>,
        @InjectRepository(AvailableSlot) private readonly slotRepository: Repository<AvailableSlot>,
    ) {}

    async createVenue(dto: CreateVenueDto): Promise<Venue> {
        const venue = this.venueRepository.create(dto);
        return await this.venueRepository.save(venue);
    }

    async getVenues(): Promise<Venue[]> {
        return await this.venueRepository.find();
    }

    async getVenueSlots(venueId: string): Promise<AvailableSlot[]> {
        return await this.slotRepository.find({ where: { venue: { id: venueId } } });
    }

    async createSlot(dto: CreateSlotDto): Promise<AvailableSlot> {
        const venue = await this.venueRepository.findOne({ where: { id: dto.venueId } });
        if (!venue) throw new Error('Venue not found');

        const slot = this.slotRepository.create({ ...dto, venue });
        return await this.slotRepository.save(slot);
    }
}
