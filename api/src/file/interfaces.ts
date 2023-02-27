import { User } from "../user/user.entity.js";

export interface BaseFile {
    name: string;
    mimetype: string;
    user?: User;
}
