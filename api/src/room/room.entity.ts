import { Entity, Column, Relation, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity.js";
import { Friend } from "../friend/friend.entity.js";
import { User } from "../user/user.entity.js";

@Entity()
export class Room extends BaseEntity {
    constructor(room: Partial<Room>) {
        super();

        Object.assign(this, room);
    }

    @Column({ nullable: false })
    roomName: string;

    @Column({ nullable: false })
    roomId: string;

    @Column({ nullable: false })
    createdBy: string;

    @Column({ nullable: false })
    ownerId: string;

    @ManyToMany(() => Friend, (friend) => friend.roomInvites, { nullable: true, eager: true })
    @JoinTable({ name: "room_invited_friends_id" })
    invitedFriends: Relation<Friend[]>;

    @ManyToMany(() => User, (user) => user.roomsParticipant, { nullable: true, eager: true })
    @JoinTable({ name: "room_user_participants_id" })
    participants: Relation<User[]>;
}
