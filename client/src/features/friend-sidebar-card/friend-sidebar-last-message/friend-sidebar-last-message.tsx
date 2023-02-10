import { memo } from "react";
import styled from "styled-components";

interface FriendCardProps {
    messageContent: string;
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

export const FriendSidebarLastMessage = memo<FriendCardProps>(({ messageContent }) => {
    return (
        <StyledLastMessageDiv>
            <p>{messageContent}</p>
        </StyledLastMessageDiv>
    );
});
