import { FC } from "react";
import { List } from "antd";

import { INotification } from "../../../entities/notification/model/interfaces";
import { RoomNotificationItem } from "../../../shared/ui";

interface INotificationPopupContentProps {
    notification: INotification;
}

export const NotificationPopupContent: FC<INotificationPopupContentProps> = ({ notification }) => {
    const data = notification.roomNotifications;
    return (
        <List dataSource={data} itemLayout={"horizontal"} renderItem={(item) => <RoomNotificationItem item={item} />} />
    );
};
