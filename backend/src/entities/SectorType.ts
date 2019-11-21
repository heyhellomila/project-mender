import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'sector_types'})
export class SectorType {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string
}
