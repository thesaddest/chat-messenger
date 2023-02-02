import { memo } from "react";
import styled from "styled-components";
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { IFriend } from "../../../entities/friend";

interface IUsernameConnectedProps {
    friend: IFriend;
}

const StyledUsernameConnectedContainer = styled.div`
    display: flex;

    span.anticon.anticon-minus-circle {
        margin-top: 0.5rem;
        margin-left: 0.3rem;
        color: #eb2f96;
    }

    span.anticon.anticon-check-circle {
        margin-top: 0.5rem;
        margin-left: 0.3rem;
        color: #52c41a;
    }

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

export const UsernameConnected = memo<IUsernameConnectedProps>(({ friend }) => {
    return (
        <StyledUsernameConnectedContainer>
            <p>{friend.username}</p>
            <div>{friend.connected ? <CheckCircleOutlined /> : <MinusCircleOutlined />}</div>
        </StyledUsernameConnectedContainer>
    );
});
