import { memo } from "react";
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { IFriend } from "../../entities/friend";
import { IMessage } from "../../entities/message";
import { SidebarAvatar } from "../../shared/ui";

interface FriendCardProps {
    friend: IFriend;
    message: IMessage;
}

const StyledLastMessageDiv = styled.div`
    display: flex;
    justify-content: start;

    p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;

const StyledUsernameConnectedMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const StyledUsernameConnectedContainer = styled.div`
    display: flex;

    p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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

export const FriendSidebarCard = memo<FriendCardProps>(({ friend, message }) => {
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
                <StyledLastMessageDiv>
                    <p>{message && message.content}</p>
                </StyledLastMessageDiv>
            </StyledUsernameConnectedMessageContainer>
        </StyledFriendsCardDiv>
    );
});
