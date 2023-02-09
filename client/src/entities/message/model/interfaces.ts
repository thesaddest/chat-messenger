export interface IMessage {
    to: string;
    from: string;
    content: string;
    messageId: string;
}

export interface IMessageValues {
    message: string;
}

export interface IDeleteMessage {
    messageId: string;
}

export interface IDeleteMessageData {
    messageIds: IDeleteMessage[];
}
