import React, { FC } from "react";
import styled from "styled-components";

interface MessageItemProps {
    friendId: string;
    to: string;
    from: string;
    content: string;
}

const StyledContainer = styled.div<MessageItemProps>`
  background: ${props => props.to === props.friendId ? "cadetblue" : "slategray"};
  color: ghostwhite;
  border: 1px solid ${props => props.to === props.friendId ? "cadetblue" : "slategray"};
  border-radius: 10px;
  margin: ${props => props.to === props.friendId ? "0 0 1rem auto" : "0 auto 1rem 0"};
  padding: 0.25rem;
  max-width: 50%;
  word-break: break-word;
`;

export const MessageItem: FC<MessageItemProps> = ({ friendId, to, from, content }) => {
    return (
        <StyledContainer friendId={friendId} to={to} from={from} content={content}>
            {content}
        </StyledContainer>
    );
};

