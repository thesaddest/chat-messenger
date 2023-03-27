import { RcFile } from "antd/lib/upload";

export interface IFile {
    fileId: string;
    name: string;
    originalName: string;
    s3Key?: string;
    mimetype: FileType;
    location: string;
    attachedBy: string;
    sentTo: string;
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
    file: PendingFile;
    username: string;
    friendIdActiveKey: string;
}

export interface IPendingAttachedFile {
    uid: string;
    name: string;
    friendIdActiveKey: string;
}

export type PendingFile = string | Blob | RcFile;
