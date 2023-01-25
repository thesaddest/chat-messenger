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

export interface IAddFriendValues {
    username: string;
}

export interface IGetMoreFriends {
    skip: number;
}
