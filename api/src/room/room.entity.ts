import { Entity, Column, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity.js";
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

    @ManyToOne(() => User, (user) => user.rooms)
    owner: Relation<User>;
}
