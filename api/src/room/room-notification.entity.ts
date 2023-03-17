import { Entity, Column, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity.js";
import { User } from "../user/user.entity.js";

@Entity()
export class RoomNotification extends BaseEntity {
    constructor(roomNotification: Partial<RoomNotification>) {
        super();

        Object.assign(this, roomNotification);
    }

    @Column({ nullable: false })
    friendUsername: string;

    @Column({ nullable: false })
    roomName: string;

    @Column({ nullable: false })
    roomId: string;

    @ManyToOne(() => User, (user) => user.roomNotifications, { nullable: false })
    sentTo: Relation<User>;
}
