import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sectors' })
export class Sector {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    kind: string;
}
