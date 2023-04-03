import { Entity, Column, OneToMany, Relation, ManyToMany } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity.js";
import { Friend } from "../friend/friend.entity.js";
import { File } from "../file/file.entity.js";
import { Room } from "../room/room.entity.js";

@Entity()
export class User extends BaseEntity {
    constructor(user: Partial<User>) {
        super();

        Object.assign(this, user);
    }

    @Column({ unique: true, nullable: false })
    userId: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    deviceId: string;

    @OneToMany(() => Friend, (friend) => friend.user, { eager: true })
    friends: Relation<Friend[]>;

    @OneToMany(() => File, (file) => file.user, { eager: true })
    files: Relation<File[]>;

    @ManyToMany(() => Room, (room) => room.participants)
    roomsParticipant: Relation<Room>;
}
