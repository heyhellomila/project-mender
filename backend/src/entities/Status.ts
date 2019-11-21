import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'status'})
export class Status {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string
}
