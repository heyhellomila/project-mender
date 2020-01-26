import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, Unique, ManyToOne} from "typeorm";
import { BusinessType } from "./BusinessType";

@Entity({name: 'businesses'})
@Unique(["NEQ"])
export class Business {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    NEQ: number

    @Column({nullable: true})
    name: string

    @ManyToOne(type => BusinessType)
    @JoinColumn({
        name: "business_type_id",
    })
    businessType: BusinessType
}
