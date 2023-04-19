import { memo } from "react";
import styled from "styled-components";

import { ChatNameConnected } from "../../../../shared/ui";
import { isRoomCreatedByCurrentUser, isChatIsRoom } from "../../../../entities/room";
import { InviteFriendToRoom } from "../../../../features/invite-friend-to-room";
import { Chat, COLORS } from "../../../../shared/const";
import { useAppSelector } from "../../../../shared/lib/hooks";

interface IChatInfoProps {
    chat: Chat;
}

const ChatInfoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh;
    width: 100%;
    border-bottom: 1px solid ${COLORS.LIGHTGREY};
`;

const ChatNameContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 0 1rem;
    align-items: center;
    justify-content: start;
`;

const InviteFriendToRoomContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
`;

export const ChatInfo = memo<IChatInfoProps>(({ chat }) => {
    const username = useAppSelector((state) => state.auth.user?.username);
    return (
        <ChatInfoContainer>
            <ChatNameContainer>
                <ChatNameConnected chat={chat} />
            </ChatNameContainer>
            <InviteFriendToRoomContainer>
                {username && isChatIsRoom(chat) && isRoomCreatedByCurrentUser(chat, username) && (
                    <InviteFriendToRoom roomName={chat.roomName} />
                )}
            </InviteFriendToRoomContainer>
        </ChatInfoContainer>
    );
});
