import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Property } from './Property';
import { Sector } from './Sector';

@Entity({ name: 'property_sectors' })
export class PropertySector {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Property)
    @JoinColumn({
        name: 'property_id',
    })
    property: Property;

    @ManyToOne(type => Sector)
    @JoinColumn({
        name: 'sector_id',
    })
    sector: Sector;
}
