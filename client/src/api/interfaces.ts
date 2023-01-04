export interface IUser {
    id: number;
    email: string;
    username: string;
    connected: boolean;
    token: string;
}

export interface IMessage {
    to: string;
    from: string;
    content: string;
}

export interface IFriend {
    id: string;
    username: string;
    addedBy: string;
}
