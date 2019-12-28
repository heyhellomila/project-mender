import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'license_types'})
export class LicenseType {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;
}
