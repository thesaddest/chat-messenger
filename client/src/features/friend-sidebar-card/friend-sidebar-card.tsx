import React, { memo } from "react";
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { IFriend } from "../../entities/friend";
import { IMessage } from "../../entities/message";
import { SidebarAvatar } from "../../shared/ui";

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

const StyledUsernameConnectedContainer = styled.div`
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

const StyledFriendsCardDiv = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;

    span.anticon.anticon-minus-circle {
        margin-top: 0.3rem;
        margin-left: 0.3rem;
        color: #eb2f96;
    }

    span.anticon.anticon-check-circle {
        margin-top: 0.3rem;
        margin-left: 0.3rem;
        color: #52c41a;
    }
`;

export const FriendSidebarCard = memo<FriendSidebarCardProps>(({ friend, message }) => {
    return (
        <StyledFriendsCardDiv>
            <div>
                <SidebarAvatar />
            </div>
            <StyledUsernameConnectedMessageContainer>
                <StyledUsernameConnectedContainer>
                    <p>{friend.username}</p>
                    <div>{friend.connected ? <CheckCircleOutlined /> : <MinusCircleOutlined />}</div>
                </StyledUsernameConnectedContainer>
                <FriendSidebarLastMessage message={message} />
            </StyledUsernameConnectedMessageContainer>
        </StyledFriendsCardDiv>
    );
});
