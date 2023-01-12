import { Entity, Column, Relation, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity.js";
import { Friend } from "../friend/friend.entity.js";

@Entity()
export class Message extends BaseEntity {
    constructor(message: Partial<Message>) {
        super();

        Object.assign(this, message);
    }

    @Column({ nullable: false })
    to: string;

    @Column({ nullable: true })
    from: string;

    @Column({ nullable: false })
    content: string;

    @ManyToOne(() => Friend, friend => friend.messages)
    friend: Relation<Friend>;
}