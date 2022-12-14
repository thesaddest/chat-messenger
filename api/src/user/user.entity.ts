import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
    constructor(user: Partial<User>) {
        super();

        Object.assign(this, user);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;
}
