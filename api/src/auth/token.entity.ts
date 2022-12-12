import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, Relation } from "typeorm";
import { User } from "../user/user.entity.js";

@Entity()
export class Token extends BaseEntity {
    constructor(token: Partial<Token>) {
        super();

        Object.assign(this, token);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    refreshToken: string;

    @OneToOne(() => User, (user) => user.token)
    user: Relation<User>;
}
