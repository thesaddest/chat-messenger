import { FC, useEffect } from "react";
import { Badge, Button, Modal } from "antd";
import { BellOutlined } from "@ant-design/icons";

import { useAppSelector, useModal } from "../../shared/lib/hooks";

import { NotificationPopupContent } from "./notification-popup-content";

export const Notification: FC = () => {
    const notifications = useAppSelector((state) => state.notification.notifications);
    const notificationLength = useAppSelector((state) => state.notification.notificationLength);
    const { isModalOpen, showModal, handleCancel, setIsModalOpen } = useModal();

    useEffect(() => {
        if (notificationLength === 0) {
            setIsModalOpen(false);
        }
    }, [notificationLength, setIsModalOpen]);

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
