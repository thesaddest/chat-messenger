import { FC } from "react";
import styled from "styled-components";
import { Button, List } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { deleteRoomNotification } from "../../../entities/notification";
import { useAppDispatch, useAppSelector, useWindowSize } from "../../lib/hooks";
import { acceptInviteToJoinRoom } from "../../../entities/room";
import { COLORS, MAX_MOBILE_WIDTH_HOOK, SIZES } from "../../const";

interface IRoomNotificationItemProps {
    notificationId: string;
    roomName: string;
    roomId: string;
    sentBy: string;
}

const StyledRoomNotificationListItem = styled(List.Item)`
    display: flex;
    font-size: 16px;

    span {
        font-size: 20px;
        color: ${COLORS.MAIN_BLUE};

        @media only screen and (max-width: ${SIZES.TABLET}) {
            font-size: 18px;
        }
    }
`;

const StyledContentContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
`;

const StyledDeclineButton = styled(Button)`
    background-color: ${COLORS.MAIN_RED};

    span {
        color: ${COLORS.MAIN_WHITE};
    }
`;

const StyledAcceptButton = styled(Button)`
    span {
        color: ${COLORS.MAIN_WHITE};
    }
`;

const StyledRoomNameSentByContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
`;

export const RoomNotificationItem: FC<IRoomNotificationItemProps> = ({ roomId, roomName, notificationId, sentBy }) => {
    const username = useAppSelector((state) => state.auth.user?.username);
    const dispatch = useAppDispatch();
    const { width } = useWindowSize();

    const handleAccept = () => {
        if (username) {
            dispatch(acceptInviteToJoinRoom({ username: username, roomId: roomId }));
            dispatch(deleteRoomNotification({ notificationId: notificationId }));
        }
    };

    const handleDecline = () => {
        dispatch(deleteRoomNotification({ notificationId: notificationId }));
    };

    return (
        <StyledRoomNotificationListItem>
            <StyledContentContainer>
                You've been invited to join
                <StyledRoomNameSentByContainer>
                    <span>{roomName}</span>
                    {width > MAX_MOBILE_WIDTH_HOOK && (
                        <p>
                            by <span>{sentBy}</span>
                        </p>
                    )}
                </StyledRoomNameSentByContainer>
            </StyledContentContainer>
            <StyledButtonsContainer>
                <StyledAcceptButton type={"primary"} shape={"circle"} icon={<CheckOutlined />} onClick={handleAccept} />
                <StyledDeclineButton
                    onClick={handleDecline}
                    danger
                    type={"primary"}
                    shape={"circle"}
                    icon={<CloseOutlined />}
                />
            </StyledButtonsContainer>
        </StyledRoomNotificationListItem>
    );
};
