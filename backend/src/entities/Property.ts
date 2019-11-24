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

    @ManyToOne(type => PropertyType)
    @JoinColumn({
        name: 'property_type_id',
    })
    propertyType: PropertyType;

    @Column()
    name: string;

    @Column()
    address: string;

    @ManyToOne(type => ActivityStatus)
    @JoinColumn({
        name: 'activity_status_id',
    })
    activityStatus: ActivityStatus;
}
