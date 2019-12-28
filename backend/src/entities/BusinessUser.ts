import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { Business } from "./Business";
import { BusinessUserRole } from "./BusinessUserRole";
import { User } from "./User";

@Entity({name: 'business_users'})
export class BusinessUser {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => BusinessUserRole)
    @JoinColumn({
        name: "business_user_role_id",
    })
    businessUserRole: BusinessUserRole;

    @ManyToOne(type => User)
    @JoinColumn({
        name: "user_id",
    })
    user: User;

    @ManyToOne(type => Business)
    @JoinColumn({
        name: "business_id",
    })
    business: Business;
}
