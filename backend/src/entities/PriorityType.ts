import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'priority_types'})
export class PriorityType {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string
}
