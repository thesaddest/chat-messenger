import { memo } from "react";
import styled from "styled-components";

import { SharedAvatar } from "../../../../shared/ui";
import { IRoom } from "../../../../entities/room";
import { InviteFriendToRoom } from "../../../../features/invite-friend-to-room";

interface IChatInfoProps {
    room: IRoom;
}

const ChatInfoContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    height: 5vh;
    width: 100%;
    border-bottom: 1px solid lightgray;
`;

const ChatInfoWrapper = styled.div`
    display: flex;
    padding: 0 1rem;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;

const StyledRoomNameContainer = styled.div`
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

export const RoomChatInfo = memo<IChatInfoProps>(({ room }) => {
    return (
        <ChatInfoContainer>
            <ChatInfoWrapper>
                <SharedAvatar height={"40px"} width={"40px"} />
                <StyledRoomNameContainer>
                    <p>{room.roomName}</p>
                </StyledRoomNameContainer>
                <InviteFriendToRoom />
            </ChatInfoWrapper>
        </ChatInfoContainer>
    );
});
