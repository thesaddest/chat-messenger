import { UploadFile } from "antd/es/upload/interface";

import { IFile } from "../../file";

export interface IMessage {
    to: string;
    from: string;
    fromUsername?: string;
    content: string;
    messageId?: string;
    isMessageSelected?: boolean;
    isMessageRead?: boolean;
    isMessageForwarded?: boolean;
    forwardedFrom?: string;
    prevMessageContent?: string;
    prevMessageFrom?: string;
    isGroupMessage?: boolean;
    isHiddenMessage?: boolean;
    friendDeviceId?: string;
    attachedFilesToUpload?: UploadFile[];
    attachedFilesAfterUpload?: IFile[];
}

export interface IMessageInChatValues {
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
