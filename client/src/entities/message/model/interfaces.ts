export interface IMessage {
    to: string;
    from: string;
    content: string;
    messageId: string;
    isMessageSelected: boolean;
    isMessageRead: boolean;
}

export interface IMessageValues {
    message: string;
}
