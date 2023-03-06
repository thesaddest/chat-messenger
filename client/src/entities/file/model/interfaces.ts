import { RcFile } from "antd/lib/upload";

export interface IFile {
    fileId: string;
    name: string;
    s3Key?: string;
    mimetype: FileType;
    location: string;
    attachedBy: string;
    streamUrl?: string;
}

export enum FileType {
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
    DOCUMENT = "DOCUMENT",
    IMAGE = "IMAGE",
}

export interface IAttachedFileProps {
    attachedFile: IFile;
}

export interface IUploadFilePayload {
    file: string | Blob | RcFile;
    username: string;
}
