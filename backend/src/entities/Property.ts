import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { User } from './User';
import { PropertyType } from './PropertyType';
import { ActivityStatus } from './ActivityStatus';

@Entity({name: 'properties'})
export class Property {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({
        name: 'user_id',
    })
    user: User;

    @Column({name: 'user_id'})
    userId: number

    @ManyToOne(type => PropertyType, {eager: true})
    @JoinColumn({
        name: 'property_type_id',
    })
    propertyType: PropertyType;

    @Column()
    name: string;

    @Column()
    address: string;

    @ManyToOne(type => ActivityStatus,  {eager: true})
    @JoinColumn({
        name: 'activity_status_id',
    })
    activityStatus: ActivityStatus;
}
