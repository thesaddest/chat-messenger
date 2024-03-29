import { User } from "../user/user.entity.js";

export interface BaseFile {
    name: string;
    originalName: string;
    s3key: string;
    mimetype: string;
    location: string;
    attachedBy?: User;
    sentTo?: string;
}
