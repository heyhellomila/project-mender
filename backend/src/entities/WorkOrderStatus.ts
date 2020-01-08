import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'work_order_status'})
export class WorkOrderStatus {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string
}
