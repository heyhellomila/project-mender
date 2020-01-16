import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'license_status'})
export class LicenseStatus {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'type'})
    status: string;
}
