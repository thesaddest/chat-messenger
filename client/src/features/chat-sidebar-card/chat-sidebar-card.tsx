import { FC, useMemo } from "react";
import styled from "styled-components";

import { IFriend } from "../../entities/friend";
import { IRoom } from "../../entities/room";
import { getLastMessageByChatType, getUnreadMessageAmount, IMessage } from "../../entities/message";
import { MessagesCountBadge, SharedAvatar, ChatNameConnected } from "../../shared/ui";
import { useAppSelector } from "../../shared/lib/hooks";

import { ChatSidebarLastMessage } from "./chat-sidebar-last-message";

interface FriendSidebarCardProps {
    chat: IFriend | IRoom;
    messages: IMessage[];
}

const StyledChatNameConnectedMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const StyledChatsCardDiv = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    overflow: hidden;
`;

export const ChatSidebarCard: FC<FriendSidebarCardProps> = ({ chat, messages }) => {
    const userId = useAppSelector((state) => state.auth.user?.userId);

    const readMessages = useAppSelector((state) => state.message.readMessages);
    const memoizedLastMessage = useMemo(() => getLastMessageByChatType(messages, chat), [messages, chat]);
    const memoizedUnreadMessageAmount = useMemo(
        () => getUnreadMessageAmount(readMessages, messages, chat, userId),
        [userId, readMessages, messages, chat],
    );

    return (
        <StyledChatsCardDiv>
            <MessagesCountBadge count={memoizedUnreadMessageAmount}>
                <SharedAvatar />
            </MessagesCountBadge>
            <StyledChatNameConnectedMessageContainer>
                <ChatNameConnected chat={chat} />
                <ChatSidebarLastMessage messageContent={memoizedLastMessage && memoizedLastMessage.content} />
            </StyledChatNameConnectedMessageContainer>
        </StyledChatsCardDiv>
    );
};
