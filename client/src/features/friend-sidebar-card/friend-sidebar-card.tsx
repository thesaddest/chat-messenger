import { FC, useMemo } from "react";
import styled from "styled-components";

import { IFriend } from "../../entities/friend";
import { getLastMessageBySender, getUnreadMessageAmount, IMessage } from "../../entities/message";
import { MessagesCountBadge, SharedAvatar } from "../../shared/ui";
import { UsernameConnected } from "../../shared/ui";

import { useAppSelector } from "../../shared/lib/hooks";

import { FriendSidebarLastMessage } from "./friend-sidebar-last-message";

interface FriendSidebarCardProps {
    friend: IFriend;
    messages: IMessage[];
}

const StyledUsernameConnectedMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const StyledFriendsCardDiv = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    overflow: hidden;
`;

export const FriendSidebarCard: FC<FriendSidebarCardProps> = ({ friend, messages }) => {
    const readMessages = useAppSelector((state) => state.message.readMessages);
    const memoizedLastMessage = useMemo(() => getLastMessageBySender(messages, friend), [messages, friend]);
    const memoizedUnreadMessageAmount = useMemo(
        () => getUnreadMessageAmount(readMessages, messages, friend),
        [readMessages, messages, friend],
    );

    return (
        <StyledFriendsCardDiv>
            <MessagesCountBadge count={memoizedUnreadMessageAmount}>
                <SharedAvatar />
            </MessagesCountBadge>
            <StyledUsernameConnectedMessageContainer>
                <UsernameConnected friend={friend} />
                <FriendSidebarLastMessage messageContent={memoizedLastMessage && memoizedLastMessage.content} />
            </StyledUsernameConnectedMessageContainer>
        </StyledFriendsCardDiv>
    );
};
