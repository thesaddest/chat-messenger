export interface IMessage {
    to: string;
    from: string;
    content: string;
    messageId: string;
    isMessageSelected: boolean;
}

export interface IMessageValues {
    message: string;
}
