import { Entity, Column, Relation, OneToMany } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity.js";
import { User } from "../user/user.entity.js";
import { Friend } from "../friend/friend.entity.js";

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

    @OneToMany(() => Friend, (friend) => friend.roomInvites, { nullable: true, eager: true })
    invitedFriends: Relation<Friend[]>;

    @OneToMany(() => User, (user) => user.roomsParticipant, { nullable: true, eager: true })
    participants: Relation<User[]>;
}
