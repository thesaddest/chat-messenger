import { User } from "./../user/user.entity.js";
import { Entity, Column, ManyToOne, Relation, OneToMany, ManyToMany } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity.js";
import { Message } from "../message/message.entity.js";
import { Room } from "../room/room.entity.js";

@Entity()
export class Friend extends BaseEntity {
    constructor(friend: Partial<Friend>) {
        super();

        Object.assign(this, friend);
    }

    @Column({ nullable: true })
    userBehindFriend: string;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: true })
    addedBy: string;

    @Column({ nullable: true })
    avatarPath: string;

    @ManyToOne(() => User, (user) => user.friends, { nullable: true })
    user: Relation<User>;

    @ManyToMany(() => Room, (room) => room.invitedFriends, { nullable: true })
    roomInvites: Relation<Room[]>;

    @OneToMany(() => Message, (message) => message.friend)
    messages: Relation<Message[]>;
}
