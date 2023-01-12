export interface IMessageValues {
    message: string;
}

export interface IMessage {
    to: string;
    from: string | null;
    content: string;
}