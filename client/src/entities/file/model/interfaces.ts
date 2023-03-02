export interface IFile {
    fileId: string;
    name: string;
    mimetype: FileType;
    location: string;
    attachedBy: string;
}

export enum FileType {
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
    DOCUMENT = "DOCUMENT",
    IMAGE = "IMAGE",
}
