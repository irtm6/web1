import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';
import { Venue } from '../../entities/venue.entity';
import { AvailableSlot } from '../../entities/available-slot.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Venue, AvailableSlot])],
    controllers: [VenueController],
    providers: [VenueService],
})
export class VenueModule {}
