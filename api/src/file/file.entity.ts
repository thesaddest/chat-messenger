import { Entity, Column, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "../common/entities/base.entity.js";
import { User } from "../user/user.entity.js";
import { Message } from "../message/message.entity.js";
import { FileType } from "../common/enums/file-type.enum.js";

@Entity()
export class File extends BaseEntity {
    constructor(file: Partial<File>) {
        super();
        Object.assign(this, file);
    }

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    s3Key: string;

    @Column({ nullable: false })
    mimetype: FileType;

    @Column({ nullable: false })
    fileId: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    attachedBy: string;

    @Column({ nullable: true })
    streamUrl: string;

    @ManyToOne(() => Message, (message) => message.files, { nullable: true })
    message: Relation<Message>;

    @ManyToOne(() => User, (user) => user.files, { nullable: true })
    user: Relation<User>;
}
