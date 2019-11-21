import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate} from "typeorm";
import { Property } from "./Property";
import { SectorType } from "./SectorType";
import { WorkOrderType } from "./WorkOrderType";
import { PriorityType } from "./PriorityType";
import { User } from "./User";

@Entity({name: 'work_orders'})
export class WorkOrder {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Property, {eager: true})
    @JoinColumn({
        name: 'property_id',
    })
    property: Property;

    @ManyToOne(type => SectorType, {eager: true})
    @JoinColumn({
        name: 'sector_id',
    })
    sectorType: SectorType;

    @ManyToOne(type => WorkOrderType, {eager: true})
    @JoinColumn({
        name: 'work_order_type_id',
    })
    workOrderType: WorkOrderType;

    @Column()
    title: string

    @Column()
    cause: string

    @Column({name: 'service_needed'})
    serviceNeeded: boolean

    @ManyToOne(type => PriorityType, {eager: true})
    @JoinColumn({
        name: 'priority_id',
    })
    priorityType: PriorityType;

    @Column({nullable: true})
    description: string

    @Column({name: 'due_date'})
    dueDate: Date

    @Column({name: 'created_date'})
    createdDate: Date

    @ManyToOne(type => User, {eager: true})
    @JoinColumn({
        name: 'created_by',
    })
    createdBy: User;
    
    @Column({name: 'last_modified_date', nullable: true})
    lastModifiedDate: Date
    
    @ManyToOne(type => User, {nullable: true})
    @JoinColumn({
        name: 'last_modified_by',
    })
    lastModifiedBy: User;

    @Column({name: 'date_completed', nullable: true})
    dateCompleted: Date

    @Column({name: 'price_estimate'})
    priceEstimate: number

    @Column({name: 'actual_cost', nullable: true})
    actualCost: number

    @BeforeInsert()
    setCreatedDate() {
        this.createdDate = new Date();
    }

    @BeforeUpdate()
    setLastModifiedDate() {
        this.lastModifiedDate = new Date();
    }
}
