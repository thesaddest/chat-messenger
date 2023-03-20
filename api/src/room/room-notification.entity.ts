import { Entity, Column } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity.js";

@Entity()
export class RoomNotification extends BaseEntity {
    constructor(roomNotification: Partial<RoomNotification>) {
        super();

        Object.assign(this, roomNotification);
    }

    @Column({ nullable: false })
    notificationId: string;

    @Column({ nullable: false })
    friendUsername: string;

    @Column({ nullable: false })
    roomName: string;

    @Column({ nullable: false })
    roomId: string;

    @Column({ nullable: false })
    sentBy: string;
}
