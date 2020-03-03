import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'property_types' })
export class PropertyType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;
}
