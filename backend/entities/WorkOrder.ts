import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Property } from "./Property";
import { SectorType } from "./SectorType";
import { WorkOrderType } from "./WorkOrderType";
import { PriorityType } from "./PriorityType";
import { User } from "./User";

@Entity()
export class WorkOrder {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Property)
    @JoinColumn({
        name: "property_id",
    })
    property: Property;

    @ManyToOne(type => SectorType)
    @JoinColumn({
        name: "sector_id",
    })
    sector: SectorType;

    @ManyToOne(type => WorkOrderType)
    @JoinColumn({
        name: "type_id",
    })
    type: WorkOrderType;

    @Column()
    title: string

    @Column()
    cause: string

    @Column()
    serviceNeeded: boolean

    @ManyToOne(type => PriorityType)
    @JoinColumn({
        name: "priority_id",
    })
    priority: PriorityType;

    @Column()
    description: string

    @Column({name: 'due_date'})
    dueDate: Date

    @Column({name: 'created_date'})
    createdDate: Date

    @ManyToOne(type => User)
    @JoinColumn({
        name: "created_by",
    })
    createdBy: User;
    
    @Column({name: 'last_modified_date'})
    lastModifiedDate: Date
    
    @ManyToOne(type => User)
    @JoinColumn({
        name: "last_modified_by",
    })
    lastModifiedBy: User;

    @Column({name: 'date_completed'})
    dateCompleted: Date

    @Column({name: 'price_estimate'})
    priceEstimate: number

    @Column({name: 'actual_cost'})
    actualCost: number
}
