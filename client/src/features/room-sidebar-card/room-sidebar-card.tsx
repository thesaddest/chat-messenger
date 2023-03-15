import { FC } from "react";
import styled from "styled-components";

import { MessagesCountBadge, SharedAvatar } from "../../shared/ui";

import { IRoom } from "../../entities/room";

interface IRoomSidebarCardProps {
    room: IRoom;
}

const StyledRoomsCardDiv = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    overflow: hidden;
`;

const StyledRoomNameMessageContainer = styled.div`
    display: flex;

    p {
        font-size: 18px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        @media only screen and (max-width: 768px) {
            font-size: 16px;
        }

        @media only screen and (max-width: 425px) {
            font-size: 18px;
        }
    }
`;

export const RoomSidebarCard: FC<IRoomSidebarCardProps> = ({ room }) => {
    return (
        <StyledRoomsCardDiv>
            <MessagesCountBadge count={88} color={"lightgray"}>
                <SharedAvatar />
            </MessagesCountBadge>
            <StyledRoomNameMessageContainer>
                <p>{room.roomName}</p>
            </StyledRoomNameMessageContainer>
        </StyledRoomsCardDiv>
    );
};
