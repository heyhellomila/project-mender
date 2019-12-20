import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, Unique, ManyToOne} from "typeorm";
import { BusinessType } from "./BusinessType";

@Entity({name: 'businesses'})
@Unique(["NEQ"])
export class Business {
    [x: string]: any;
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    NEQ: number

    @Column({nullable: true})
    name: string

    @ManyToOne(type => BusinessType)
    @JoinColumn({
        name: "business_type_id",
    })
    type: BusinessType
}
