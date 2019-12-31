import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { WorkOrder } from './WorkOrder';


@Entity({ name: 'shopping_items'})    
export class ShoppingItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => WorkOrder)
    @JoinColumn({
        name: 'work_order_id',
    })
    workOrder: WorkOrder;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column({name: 'status', type: 'bit', transformer:{ from: (v: Buffer) => !!v.readInt8(0), to: v => v }})
    status: Boolean;
}