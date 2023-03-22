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

export interface ICreateRoomNotification {
    friendUsername: string;
    roomId: string;
    sentBy: string;
    roomName: string;
}

export interface IDeleteRoomNotification {
    notificationId: string;
}
