import { memo, useEffect } from "react";
import { Badge, Button, Modal } from "antd";
import { BellOutlined } from "@ant-design/icons";

import { useAppSelector, useModal, useWindowSize } from "../../shared/lib/hooks";
import { SIZES } from "../../shared/const";

import { NotificationPopupContent } from "./notification-popup-content";

export const Notification = memo(() => {
    const notifications = useAppSelector((state) => state.notification.notifications);
    const notificationLength = useAppSelector((state) => state.notification.notificationLength);

    const { isModalOpen, showModal, handleCancel, setIsModalOpen } = useModal();
    const { width } = useWindowSize();

    useEffect(() => {
        if (notificationLength === 0) {
            setIsModalOpen(false);
        }
    }, [notificationLength, setIsModalOpen]);

    return (
        <Badge count={notificationLength}>
            <Button
                type={"primary"}
                onClick={showModal}
                shape={"circle"}
                size={width > Number(SIZES.MOBILE) ? "large" : "middle"}
            >
                <BellOutlined />
            </Button>
            <Modal title="Notifications" open={isModalOpen} onCancel={handleCancel} centered={true} footer={null}>
                <NotificationPopupContent notifications={notifications} />
            </Modal>
        </Badge>
    );
});
