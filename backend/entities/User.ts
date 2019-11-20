import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { UserType } from "./UserType";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column({name: 'password_hash'})
    password_hash: string

    @Column({name: 'first_name'})
    firstName: string

    @Column({name: 'last_name'})
    lastName: string

    @Column({name: 'phone_number'})
    phoneNumber: number

    @ManyToOne(type => UserType)
    @JoinColumn({
        name: "type_id",
    })
    type: UserType;
}
