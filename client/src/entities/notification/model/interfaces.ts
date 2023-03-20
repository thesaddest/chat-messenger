export interface INotification {
    roomNotifications: IRoomNotification[];
}

export interface IRoomNotification {
    notificationId: string;
    roomId: string;
    roomName: string;
    friendUsername: string;
    sentBy: string;
}
