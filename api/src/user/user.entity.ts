import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, Relation } from "typeorm";
import { Token } from "../auth/token.entity.js";

@Entity()
export class User extends BaseEntity {
    constructor(user: Partial<User>) {
        super();

        Object.assign(this, user);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @OneToOne(() => Token, (token) => token.user)
    @JoinColumn()
    token: Relation<Token>;
}
