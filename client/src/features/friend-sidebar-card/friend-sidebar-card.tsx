import { memo, useMemo } from "react";
import styled from "styled-components";

import { IFriend } from "../../entities/friend";
import { getLastMessageBySender, IMessage } from "../../entities/message";
import { SharedAvatar } from "../../shared/ui";
import { UsernameConnected } from "../../shared/ui";

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

export const FriendSidebarCard = memo<FriendSidebarCardProps>(({ friend, messages }) => {
    const memoizedLastMessage = useMemo(() => getLastMessageBySender(messages, friend), [messages, friend]);

    return (
        <StyledFriendsCardDiv>
            <div>
                <SharedAvatar />
            </div>
            <StyledUsernameConnectedMessageContainer>
                <UsernameConnected friend={friend} />
                <FriendSidebarLastMessage messageContent={memoizedLastMessage && memoizedLastMessage.content} />
            </StyledUsernameConnectedMessageContainer>
        </StyledFriendsCardDiv>
    );
});
