import { IsBoolean, IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSlotDto {
    @IsUUID()
    @IsNotEmpty()
    venueId: string;

    @IsDateString()
    start_time: string;

    @IsDateString()
    end_time: string;

    @IsBoolean()
    is_available: boolean;
}
