import { FC, useMemo } from "react";
import styled from "styled-components";

import { getChatName } from "../../entities/room";
import { getLastMessageByChatType, getUnreadMessageAmount, IMessage } from "../../entities/message";
import { MessagesCountBadge, SharedAvatar, ChatNameConnected, ChatNameFirstLetter } from "../../shared/ui";
import { useAppSelector } from "../../shared/lib/hooks";

import { Chat } from "../../shared/const";

import { ChatSidebarLastMessage } from "./chat-sidebar-last-message";

interface FriendSidebarCardProps {
    chat: Chat;
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
    const chatName = useMemo(() => getChatName(chat), [chat]);

    return (
        <StyledChatsCardDiv>
            <MessagesCountBadge count={memoizedUnreadMessageAmount}>
                <SharedAvatar>
                    <ChatNameFirstLetter username={chatName} size={"18px"} />
                </SharedAvatar>
            </MessagesCountBadge>
            <StyledChatNameConnectedMessageContainer>
                <ChatNameConnected chat={chat} />
                {memoizedLastMessage && (
                    <ChatSidebarLastMessage
                        messageContent={memoizedLastMessage.isHiddenMessage ? "" : memoizedLastMessage.content}
                    />
                )}
            </StyledChatNameConnectedMessageContainer>
        </StyledChatsCardDiv>
    );
};
