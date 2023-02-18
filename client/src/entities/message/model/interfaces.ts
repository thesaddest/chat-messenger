export interface IMessage {
    to: string;
    from: string;
    content: string;
    messageId?: string;
    isMessageSelected?: boolean;
    isMessageRead?: boolean;
    isMessageForwarded?: boolean;
    forwardedFrom?: string;
    isPrevMessageReplied?: boolean;
}

export interface IMessageValues {
    message: string;
}

export interface IForwardMessagesPayload {
    messages: IMessage[];
    from: string;
    to: string;
}
