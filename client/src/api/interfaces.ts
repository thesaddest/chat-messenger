export interface IUser {
    userId: string;
    email: string;
    username: string;
    token: string;
}

export interface IMessage {
    to: string;
    from: string;
    content: string;
}

export interface IFriend {
    userBehindFriend: string;
    username: string;
    addedBy: string;
    connected: boolean;
}

export interface IFriendStatus {
    connected: boolean;
    username: string;
}
