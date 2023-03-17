import { BellOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";

import { useAppSelector } from "../../shared/lib/hooks";

export const Notification = () => {
    const notificationLength = useAppSelector((state) => state.notification.notificationLength);

    return (
        <Badge count={notificationLength}>
            <Button type={"primary"}>
                <BellOutlined />
            </Button>
        </Badge>
    );
};
