import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_types' })
export class UserType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;
}
