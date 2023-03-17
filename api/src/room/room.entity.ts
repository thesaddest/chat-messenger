import { Entity, Column, ManyToOne, Relation, OneToMany } from "typeorm";
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

    @ManyToOne(() => User, (user) => user.rooms, { nullable: false })
    owner: Relation<User>;

    @OneToMany(() => Friend, (friend) => friend.roomInvites, { nullable: true, eager: true })
    invitedFriends: Relation<Friend[]>;

    @OneToMany(() => User, (user) => user.roomsParticipant, { nullable: true })
    participants: Relation<User[]>;
}
