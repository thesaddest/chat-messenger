import { FC } from "react";
import styled from "styled-components";

import { IMessage } from "../../../entities/message";

interface FriendCardProps {
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

export const FriendSidebarLastMessage: FC<FriendCardProps> = ({ message }) => {
    return (
        <StyledLastMessageDiv>
            <p>{message && message.content}</p>
        </StyledLastMessageDiv>
    );
};
