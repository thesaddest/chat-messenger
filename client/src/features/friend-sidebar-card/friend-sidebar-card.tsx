import { memo } from "react";
import styled from "styled-components";

import { IFriend } from "../../entities/friend";
import { IMessage } from "../../entities/message";
import { SharedAvatar } from "../../shared/ui";
import { UsernameConnected } from "../../shared/ui";

import { FriendSidebarLastMessage } from "./friend-sidebar-last-message";

interface FriendSidebarCardProps {
    friend: IFriend;
    message: IMessage;
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
`;

export const FriendSidebarCard = memo<FriendSidebarCardProps>(({ friend, message }) => {
    return (
        <StyledFriendsCardDiv>
            <div>
                <SharedAvatar />
            </div>
            <StyledUsernameConnectedMessageContainer>
                <UsernameConnected friend={friend} />
                <FriendSidebarLastMessage message={message} />
            </StyledUsernameConnectedMessageContainer>
        </StyledFriendsCardDiv>
    );
});
