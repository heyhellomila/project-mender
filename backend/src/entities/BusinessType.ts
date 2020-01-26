import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'business_types' })
export class BusinessType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'type' })
    type: string;
}
