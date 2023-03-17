export interface INotification {
    roomNotifications: IRoomNotification[];
}

export interface IRoomNotification {
    roomId: string;
    roomName: string;
    friendUsername: string;
}
