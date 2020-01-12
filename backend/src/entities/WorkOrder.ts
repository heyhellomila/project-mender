import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert,
    BeforeUpdate } from 'typeorm';
import { Property } from './Property';
import { Sector } from './Sector';
import { WorkOrderType } from './WorkOrderType';
import { PriorityType } from './PriorityType';
import { WorkOrderStatus } from './WorkOrderStatus';
import { User } from './User';

@Entity({ name: 'work_orders' })
export class WorkOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Property)
    @JoinColumn({
        name: 'property_id',
    })
    property: Property;

    @ManyToOne(type => Sector)
    @JoinColumn({
        name: 'sector_id',
    })
    sector: Sector;

    @ManyToOne(type => WorkOrderType)
    @JoinColumn({
        name: 'work_order_type_id',
    })
    workOrderType: WorkOrderType;

    @Column()
    title: string

    @Column()
    cause: string

    @Column({ name: 'service_needed', type: 'bit', transformer:
            { from: (v: Buffer) => !!v.readInt8(0), to: v => v }})
    serviceNeeded: Boolean

    @ManyToOne(type => PriorityType)
    @JoinColumn({
        name: 'priority_type_id',
    })
    priorityType: PriorityType;

    @Column({ nullable: true })
    description: string

    @Column({ name: 'due_date' })
    dueDate: Date

    @Column({ name: 'created_date' })
    createdDate: Date

    @ManyToOne(type => User)
    @JoinColumn({
        name: 'created_by',
    })
    createdBy: User;

    @Column({ name: 'last_modified_date', nullable: true })
    lastModifiedDate: Date;

    @ManyToOne(type => User, { nullable: true })
    @JoinColumn({
        name: 'last_modified_by',
    })
    lastModifiedBy: User;

    @Column({ name: 'date_completed', nullable: true })
    dateCompleted: Date

    @Column({ name: 'price_estimate' })
    priceEstimate: number

    @Column({ name: 'actual_cost', nullable: true })
    actualCost: number

    @Column({ name: 'bookmarked', type: 'bit', transformer:
            { from: (v: Buffer) => !!v.readInt8(0), to: v => v }})
    bookmarked: Boolean

    @ManyToOne(type => WorkOrderStatus)
    @JoinColumn({
        name: 'work_order_status_id',
    })
    workOrderStatus: WorkOrderStatus;

    @BeforeInsert()
    setCreatedDate() {
        this.createdDate = new Date();
    }

    @BeforeUpdate()
    setLastModifiedDate() {
        this.lastModifiedDate = new Date();
    }
}
