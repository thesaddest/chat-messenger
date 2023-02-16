export interface IMessage {
    to: string;
    from: string;
    content: string;
    messageId: string;
    isMessageSelected: boolean;
    isMessageRead: boolean;
    isMessageForwarded: boolean;
    forwardedFrom?: string;
}

export interface IMessageValues {
    message: string;
}

export interface IForwardMessagesPayload {
    messages: IMessage[];
    to: string;
}
