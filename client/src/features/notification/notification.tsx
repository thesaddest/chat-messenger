import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Badge, Button, Modal } from "antd";
import { BellOutlined } from "@ant-design/icons";

import { useAppSelector } from "../../shared/lib/hooks";

import { NotificationPopupContent } from "./notification-popup-content";

export const Notification: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const notifications = useAppSelector((state) => state.notification.notifications);
    const notificationLength = useAppSelector((state) => state.notification.notificationLength);

    console.log(notificationLength, notifications);

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCancel = useCallback((e: SyntheticEvent) => {
        e.stopPropagation();
        setIsModalOpen(false);
    }, []);

    useEffect(() => {
        if (notificationLength === 0) {
            setIsModalOpen(false);
        }
    }, [notificationLength]);

    return (
        <Badge count={notificationLength}>
            <Button type={"primary"} onClick={showModal}>
                <BellOutlined />
            </Button>

            <Modal title="Notifications" open={isModalOpen} onCancel={handleCancel} centered={true} footer={null}>
                <NotificationPopupContent notifications={notifications} />
            </Modal>
        </Badge>
    );
};
