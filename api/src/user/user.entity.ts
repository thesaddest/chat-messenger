import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;
}
