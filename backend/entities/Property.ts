import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { PropertyType } from "./PropertyType";
import { Status } from "./Status";

@Entity()
export class Property {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({
        name: "user_id",
    })
    User: User;

    @ManyToOne(type => PropertyType)
    @JoinColumn({
        name: "type_id",
    })
    type: PropertyType;

    @Column()
    name: string;

    @ManyToOne(type => Status)
    @JoinColumn({
        name: "status_id",
    })
    status: Status;
}
