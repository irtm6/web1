import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Venue } from './venue.entity';

@Entity('available_slots')
export class AvailableSlot {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Venue, venue => venue.slots, { onDelete: 'CASCADE' })
    venue: Venue;

    @Column({ type: 'timestamp' })
    start_time: Date;

    @Column({ type: 'timestamp' })
    end_time: Date;

    @Column({ default: true })
    is_available: boolean;
}
