import { memo } from "react";
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Avatar } from "antd";

import { IFriend } from "../../entities/friend";

interface FriendCardProps {
    friend: IFriend;
}

const StyledFriendsCardDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span.anticon.anticon-minus-circle {
        margin-right: 0.3rem;
        color: #eb2f96;
    }

    span.anticon.anticon-check-circle {
        margin-right: 0.3rem;
        color: #52c41a;
    }
`;

const StyledAvatar = styled(Avatar)`
    width: 36px;
    height: 36px;
    line-height: 12px;
    margin-right: 0.3rem;
`;

export const FriendSidebarCard = memo<FriendCardProps>(({ friend }) => {
    console.log(friend);
    return (
        <StyledFriendsCardDiv>
            {friend.connected ? <CheckCircleOutlined /> : <MinusCircleOutlined />}
            <StyledAvatar /> {friend.username}
        </StyledFriendsCardDiv>
    );
});
