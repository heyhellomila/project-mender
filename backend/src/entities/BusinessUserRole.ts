import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'business_user_roles'})
export class BusinessUserRole {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string
}