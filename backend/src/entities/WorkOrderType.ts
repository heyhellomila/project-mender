import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'work_order_types' })
export class WorkOrderType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;
}
