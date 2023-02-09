import { FC, useState, useCallback } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../../../../shared/lib/hooks";
import { selectMessage, deselectMessage } from "../../model";

interface MessageItemProps {
    friendId: string;
    to: string;
    from: string;
    content: string;
    messageId: string;
    isMessageSelected?: boolean;
}

const StyledContainer = styled.div<MessageItemProps>`
    background: ${(props) => (props.to === props.friendId ? "#1677ff" : "lightgray")};
    color: ${(props) => (props.to === props.friendId ? "whitesmoke" : "black")};
    border: 1px solid ${(props) => (props.to === props.friendId ? "#1677ff" : "lightgray")};
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-radius: 20px;
    margin: ${(props) => (props.to === props.friendId ? "0 0 1rem auto" : "0 auto 1rem 0")};
    padding: 0.5rem;
    max-width: 50%;
    word-break: break-word;
    filter: ${(props) => props.isMessageSelected && "grayscale(80%)"};
`;

export const MessageItem: FC<MessageItemProps> = ({ friendId, to, from, content, messageId }) => {
    const [isMessageSelected, setIsMessageSelected] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleClick = useCallback(() => {
        if (!isMessageSelected) {
            dispatch(selectMessage({ messageId: messageId }));
            setIsMessageSelected(true);
        } else {
            dispatch(deselectMessage({ messageId: messageId }));
            setIsMessageSelected(false);
        }
    }, [dispatch, isMessageSelected, messageId]);

    return (
        <StyledContainer
            friendId={friendId}
            to={to}
            from={from}
            content={content}
            messageId={messageId}
            onClick={handleClick}
            isMessageSelected={isMessageSelected}
        >
            <p>{content}</p>
        </StyledContainer>
    );
};
