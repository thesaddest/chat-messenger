export interface IDeleteMessage {
    messageId: string;
}

export interface IDeleteMessageRequest {
    messageIds: IDeleteMessage[];
}
