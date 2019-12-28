import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique} from "typeorm";
import { LicenseType } from "./LicenseType";
import { LicenseStatus } from "./LicenseStatus";
import { User } from "./User";

@Entity({name: 'licenses'})
@Unique("unique_number_type", ["license_number", "license_type_id"])
export class License {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({
        name: "user_id",
    })
    user: User;

    @Column({name: 'license_number'})
    licenseNumber: number;

    @ManyToOne(type => LicenseType)
    @JoinColumn({
        name: "license_type_id",
    })
    licenseType: LicenseType;

    @ManyToOne(type => LicenseStatus)
    @JoinColumn({
        name: "license_status_id",
    })
    licenseStatus: LicenseStatus;

    @Column({name: 'expiry_date', nullable: true})
    expiryDate: Date;
}
