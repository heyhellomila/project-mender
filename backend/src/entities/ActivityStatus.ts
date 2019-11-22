import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'activity_status'})
export class ActivityStatus {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string
}
