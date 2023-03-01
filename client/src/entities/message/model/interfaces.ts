import { UploadFile } from "antd/es/upload/interface";

export interface IMessage {
    to: string;
    from: string;
    content: string;
    messageId?: string;
    isMessageSelected?: boolean;
    isMessageRead?: boolean;
    isMessageForwarded?: boolean;
    forwardedFrom?: string;
    prevMessageContent?: string;
    prevMessageFrom?: string;
    attachedFilesToUpload?: UploadFile[];
    attachedFilesAfterUpload?: IFile[];
}

export interface IMessageValues {
    message: string;
    uploadedFiles: UploadFile[];
}

export interface IForwardMessagesPayload {
    messages: IMessage[];
    from: string;
    to: string;
}

export interface IReplyToMessagePayload {
    newMessage: IMessage;
    repliedMessage: IMessage;
}

export interface IFile {
    fileId: string;
    name: string;
    mimetype: string;
    location: string;
    attachedBy: string;
}

export interface ISendMessageWithFilesPayload {
    newMessage: IMessage;
    attachedFiles: FormData;
}
