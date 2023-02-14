import { FC, useCallback } from "react";
import styled from "styled-components";
import { CheckOutlined } from "@ant-design/icons";

import { useAppDispatch } from "../../../../shared/lib/hooks";
import { selectMessage, deselectMessage } from "../../model";

interface MessageItemProps {
    friendId: string;
    to: string;
    from: string;
    content: string;
    messageId: string;
    isMessageSelected: boolean;
    isMessageRead: boolean;
}

interface StyledIsMessageReadContainerProps {
    isMessageRead: boolean;
}

const StyledContainer = styled.div<MessageItemProps>`
    background: ${(props) => (props.to !== props.friendId ? "#1677ff" : "lightgray")};
    color: ${(props) => (props.to !== props.friendId ? "whitesmoke" : "black")};
    border: 1px solid ${(props) => (props.to !== props.friendId ? "#1677ff" : "lightgray")};
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-radius: 20px;
    margin: ${(props) => (props.to === props.friendId ? "0 0 1rem auto" : "0 auto 1rem 0")};
    padding: 0.5rem;
    max-width: 50%;
    word-break: break-word;
    filter: ${(props) => props.isMessageSelected && "blur(2px)"};
    cursor: pointer;
`;

const StyledMessageContentHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const StyledIsMessageReadContainer = styled.div<StyledIsMessageReadContainerProps>`
    display: flex;
    justify-content: end;
    align-items: start;
    color: ${(props) => (props.isMessageRead ? "whitesmoke" : "black")};
`;

export const MessageItem: FC<MessageItemProps> = ({
    friendId,
    to,
    from,
    content,
    messageId,
    isMessageSelected,
    isMessageRead,
}) => {
    const dispatch = useAppDispatch();

    const handleClick = useCallback(() => {
        if (!isMessageSelected) {
            dispatch(
                selectMessage({
                    from: from,
                    to: to,
                    messageId: messageId,
                    content: content,
                    isMessageSelected: true,
                    isMessageRead: isMessageRead,
                }),
            );
        } else {
            dispatch(
                deselectMessage({
                    from: from,
                    to: to,
                    messageId: messageId,
                    content: content,
                    isMessageSelected: false,
                    isMessageRead: isMessageRead,
                }),
            );
        }
    }, [content, dispatch, from, isMessageSelected, messageId, to, isMessageRead]);

    return (
        <StyledContainer
            friendId={friendId}
            to={to}
            from={from}
            content={content}
            messageId={messageId}
            onClick={handleClick}
            isMessageSelected={isMessageSelected}
            isMessageRead={isMessageRead}
        >
            <StyledMessageContentHolder>
                <p>{content}</p>
            </StyledMessageContentHolder>
            <StyledIsMessageReadContainer isMessageRead={isMessageRead}>
                <CheckOutlined />
            </StyledIsMessageReadContainer>
        </StyledContainer>
    );
};
