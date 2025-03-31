import { Controller, Logger, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VenueService } from './venue.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { CreateVenueDto } from './dto/create-venue.dto';
import { patterns } from '../patterns';
import { UserDTO } from '../../../../user-service/src/modules/user/dto/user.dto';

@Controller()
export class VenueController {
    private readonly logger = new Logger(VenueController.name);

    constructor(private readonly venueService: VenueService) {}

    @MessagePattern(patterns.VENUE.CREATE)
    async createVenue(@Payload() { user, dto }: { user: UserDTO, dto: CreateVenueDto }) {
        this.logger.log('Creating venue');
        return this.venueService.createVenue(user, dto);
    }

    @MessagePattern(patterns.VENUE.GET_ALL)
    async getVenues() {
        this.logger.log('Fetching all venues');
        return this.venueService.getVenues();
    }

    @MessagePattern(patterns.VENUE.GET_SLOTS)
    async getVenueSlots(@Payload() id: string) {
        this.logger.log(`Fetching slots for venue ID: ${id}`);
        return this.venueService.getVenueSlots(id);
    }

    // ----------- Управління слотами -----------

    @MessagePattern(patterns.VENUE.CREATE_SLOT)
    async createSlot(@Payload() { user, dto }: { user: UserDTO, dto: CreateSlotDto }) {
        this.logger.log('Creating slot');
        return this.venueService.createSlot(user, dto);
    }

    @MessagePattern(patterns.VENUE.UPDATE_SLOT)
    async updateSlot(@Payload() { user, slotId, dto }: { user: UserDTO, slotId: string, dto: Partial<CreateSlotDto> }) {
        this.logger.log(`Updating slot ${slotId}`);
        return this.venueService.updateSlot(user, slotId, dto);
    }

    @MessagePattern(patterns.VENUE.DELETE_SLOT)
    async deleteSlot(@Payload() { user, slotId }: { user: UserDTO, slotId: string }) {
        this.logger.log(`Deleting slot ${slotId}`);
        return this.venueService.deleteSlot(user, slotId);
    }
}
