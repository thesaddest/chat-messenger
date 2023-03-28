import { memo } from "react";
import styled from "styled-components";

import { IFriend } from "../../../../entities/friend";
import { SharedAvatar, ChatNameConnected } from "../../../../shared/ui";
import { IRoom, isChatCreatedByCurrentUser, isChatIsRoom } from "../../../../entities/room";
import { InviteFriendToRoom } from "../../../../features/invite-friend-to-room";
import { COLORS } from "../../../../shared/const";
import { useAppSelector } from "../../../../shared/lib/hooks";

interface IChatInfoProps {
    chat: IFriend | IRoom;
}

const ChatInfoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh;
    width: 100%;
    border-bottom: 1px solid ${COLORS.LIGHTGREY};
`;

const AvatarChatNameContainer = styled.div`
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
            <AvatarChatNameContainer>
                <SharedAvatar height={"40px"} width={"40px"} />
                <ChatNameConnected chat={chat} />
            </AvatarChatNameContainer>
            <InviteFriendToRoomContainer>
                {username && isChatIsRoom(chat) && isChatCreatedByCurrentUser(chat, username) && (
                    <InviteFriendToRoom roomName={chat.roomName} />
                )}
            </InviteFriendToRoomContainer>
        </ChatInfoContainer>
    );
});
