import { memo, useCallback } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../../../../shared/lib/hooks";
import { selectMessage, deselectMessage, createMessage } from "../../model";
import { MessageReadCheck } from "../../../../shared/ui";

interface MessageItemProps {
    friendId: string;
    to: string;
    from: string;
    content: string;
    messageId: string;
    isMessageSelected: boolean;
    isMessageRead: boolean;
    isMessageForwarded: boolean;
    forwardedFrom?: string;
}

const StyledContainer = styled.div<MessageItemProps>`
    background: ${(props) => (props.to !== props.friendId ? "#1677ff" : "lightgray")};
    color: ${(props) => (props.to !== props.friendId ? "whitesmoke" : "black")};
    border: 1px solid ${(props) => (props.to !== props.friendId ? "#1677ff" : "lightgray")};
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-radius: 20px;
    margin: ${(props) => (props.to === props.friendId ? "0 0 1rem auto" : "0 auto 1rem 0")};
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    max-width: 50%;
    word-break: break-word;
    filter: ${(props) => props.isMessageSelected && "blur(2px)"};
    cursor: pointer;
`;

const StyledMessageContentHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-right: 0.2rem;
`;

const StyledForwarded = styled.p<{ to: string; friendId: string }>`
    font-size: 16px;
    font-style: italic;
    color: ${(props) => (props.to === props.friendId ? "whitesmoke" : "black")};
`;

export const MessageItem = memo<MessageItemProps>(
    ({
        friendId,
        to,
        from,
        content,
        messageId,
        isMessageSelected,
        isMessageRead,
        isMessageForwarded,
        forwardedFrom,
    }) => {
        const dispatch = useAppDispatch();

        const handleClick = useCallback(() => {
            if (!isMessageSelected) {
                dispatch(
                    selectMessage(createMessage(to, from, content, messageId, true, isMessageRead, isMessageForwarded)),
                );
            } else {
                dispatch(
                    deselectMessage(
                        createMessage(to, from, content, messageId, false, isMessageRead, isMessageForwarded),
                    ),
                );
            }
        }, [isMessageSelected, dispatch, to, from, content, messageId, isMessageRead, isMessageForwarded]);

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
                isMessageForwarded={isMessageForwarded}
                forwardedFrom={forwardedFrom}
            >
                {isMessageForwarded && (
                    <StyledForwarded to={to} friendId={friendId}>
                        Forwarded from {forwardedFrom}
                    </StyledForwarded>
                )}
                <StyledMessageContentHolder>
                    <p>{content}</p>
                </StyledMessageContentHolder>
                <MessageReadCheck isMessageRead={isMessageRead} />
            </StyledContainer>
        );
    },
);
