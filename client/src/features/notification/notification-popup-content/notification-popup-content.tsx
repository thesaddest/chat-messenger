import { FC } from "react";
import { List } from "antd";

import { INotification } from "../../../entities/notification/model/interfaces";
import { RoomNotificationItem } from "../../../shared/ui";

interface INotificationPopupContentProps {
    notifications: INotification;
}

export const NotificationPopupContent: FC<INotificationPopupContentProps> = ({ notifications }) => {
    const data = notifications.roomNotifications;

    return (
        <List dataSource={data} itemLayout={"horizontal"} renderItem={(item) => <RoomNotificationItem item={item} />} />
    );
};
