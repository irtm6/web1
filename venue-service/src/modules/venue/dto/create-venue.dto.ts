import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVenueDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsEnum(['football', 'tennis', 'basketball'])
    type!: string;

    @IsString()
    @IsOptional()
    description?: string;
}
