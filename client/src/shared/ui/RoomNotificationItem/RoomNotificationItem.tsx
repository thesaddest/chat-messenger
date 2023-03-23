import { FC } from "react";
import styled from "styled-components";
import { Button, List } from "antd";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { IRoomNotification } from "../../../entities/notification/model/interfaces";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { acceptInviteToJoinRoom } from "../../../entities/room";
import { deleteRoomNotification } from "../../../entities/notification/model/notification";

interface IRoomNotificationItemProps {
    item: IRoomNotification;
}

const StyledRoomNotificationListItem = styled(List.Item)`
    display: flex;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    span {
        font-size: 18px;
        color: #1677ff;

        @media only screen and (max-width: 768px) {
            font-size: 16px;
        }

        @media only screen and (max-width: 425px) {
            font-size: 18px;
        }
    }
`;

const StyledDeclineButton = styled(Button)`
    background-color: #f5222d;
`;

export const RoomNotificationItem: FC<IRoomNotificationItemProps> = ({ item }) => {
    const username = useAppSelector((state) => state.auth.user?.username);
    const dispatch = useAppDispatch();

    const handleAccept = () => {
        if (username) {
            dispatch(acceptInviteToJoinRoom({ username: username, roomId: item.roomId }));
            dispatch(deleteRoomNotification({ notificationId: item.notificationId }));
        }
    };

    const handleDecline = () => {
        dispatch(deleteRoomNotification({ notificationId: item.notificationId }));
    };

    return (
        <StyledRoomNotificationListItem>
            <p>
                You've been invited to join <span>{item.roomName}</span> by <span>{item.sentBy}</span>
            </p>
            <Button
                type={"primary"}
                shape={"circle"}
                icon={<CheckOutlined style={{ color: "whitesmoke" }} onClick={handleAccept} />}
            />
            <StyledDeclineButton
                danger
                type={"primary"}
                shape={"circle"}
                icon={<CloseOutlined style={{ color: "whitesmoke" }} onClick={handleDecline} />}
            />
        </StyledRoomNotificationListItem>
    );
};
