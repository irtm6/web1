import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { CreateSlotDto } from './dto/create-slot.dto';
import { Venue } from '../../entities/venue.entity';
import { AvailableSlot } from '../../entities/available-slot.entity';

@Controller('venues')
export class VenueController {
    constructor(private readonly venueService: VenueService) {}

    // 1. Створення нового майданчика
    @Post()
    createVenue(@Body() dto: CreateVenueDto): Promise<Venue> {
        return this.venueService.createVenue(dto);
    }

    // 2. Отримання списку всіх майданчиків
    @Get()
    getVenues(): Promise<Venue[]> {
        return this.venueService.getVenues();
    }

    // 3. Отримання доступних слотів для конкретного майданчика
    @Get(':id/slots')
    getVenueSlots(@Param('id') id: string): Promise<AvailableSlot[]> {
        return this.venueService.getVenueSlots(id);
    }
}
