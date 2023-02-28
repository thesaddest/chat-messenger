import { Entity, Column, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity.js";
import { User } from "../user/user.entity.js";

@Entity()
export class File extends BaseEntity {
    constructor(file: Partial<File>) {
        super();
        Object.assign(this, file);
    }

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    mimetype: string;

    @Column({ nullable: false })
    fileId: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    attachedBy: string;

    @ManyToOne(() => User, (user) => user.files, { nullable: true })
    user: Relation<User>;
}
