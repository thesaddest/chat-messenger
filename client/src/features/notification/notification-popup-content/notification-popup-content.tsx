import { FC } from "react";
import { List } from "antd";

import { INotification } from "../../../entities/notification";
import { RoomNotificationItem } from "../../../shared/ui";

interface INotificationPopupContentProps {
    notifications: INotification;
}

export const NotificationPopupContent: FC<INotificationPopupContentProps> = ({ notifications }) => {
    const data = notifications.roomNotifications;

    return (
        <List
            dataSource={data}
            itemLayout={"horizontal"}
            renderItem={({ roomName, roomId, notificationId, sentBy }) => (
                <RoomNotificationItem
                    roomName={roomName}
                    roomId={roomId}
                    notificationId={notificationId}
                    sentBy={sentBy}
                />
            )}
        />
    );
};
