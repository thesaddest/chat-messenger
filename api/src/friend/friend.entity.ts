import { User } from "./../user/user.entity.js";
import { Entity, Column, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity.js";

@Entity()
export class Friend extends BaseEntity {
    constructor(friend: Partial<Friend>) {
        super();

        Object.assign(this, friend);
    }

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: true })
    addedBy: string;

    @ManyToOne(() => User, (user) => user.friends, { nullable: true })
    user: Relation<User>;
}
