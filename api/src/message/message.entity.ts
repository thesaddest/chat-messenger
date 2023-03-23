import { Entity, Column, Relation, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity.js";
import { Friend } from "../friend/friend.entity.js";
import { File } from "../file/file.entity.js";
import { Room } from "../room/room.entity.js";

@Entity()
export class Message extends BaseEntity {
    constructor(message: Partial<Message>) {
        super();

        Object.assign(this, message);
    }

    @Column({ nullable: false })
    messageId: string;

    @Column({ nullable: false })
    to: string;

    @Column({ nullable: true })
    from: string;

    @Column({ nullable: true })
    fromUsername: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false })
    isMessageRead: boolean;

    @Column({ nullable: false })
    isMessageForwarded: boolean;

    @Column({ nullable: true })
    prevMessageContent: string;

    @Column({ nullable: true })
    prevMessageFrom: string;

    @Column({ nullable: false })
    isGroupMessage: boolean;

    @OneToMany(() => File, (file) => file.message, { eager: true })
    files: Relation<File[]>;

    @ManyToOne(() => Friend, (friend) => friend.messages)
    friend: Relation<Friend>;
}
