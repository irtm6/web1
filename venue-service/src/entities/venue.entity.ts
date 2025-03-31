import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { AvailableSlot } from './available-slot.entity';

@Entity('venues')
export class Venue {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    location!: string;

    @Column({ type: 'enum', enum: ['football', 'tennis', 'basketball'], default: 'football' })
    type!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @CreateDateColumn()
    created_at!: Date;

    @OneToMany(() => AvailableSlot, slot => slot.venue)
    slots!: AvailableSlot[];
}
