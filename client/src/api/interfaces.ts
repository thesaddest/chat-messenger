export interface IUser {
    id: number;
    email: string;
    username: string;
    connected: boolean;
    token: string;
}

export interface IMessage {
    to: string;
    from: string | null;
    content: string;
}

export interface IFriend {
    id: string;
    username: string;
    addedBy: string;
    connected: boolean;
}

export interface IFriendStatus {
    connected: boolean;
    username: string;
}
