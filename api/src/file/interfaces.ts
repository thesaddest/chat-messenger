import { User } from "../user/user.entity.js";

export interface BaseFile {
    name: string;
    mimetype: string;
    location: string;
    attachedBy?: User;
}
