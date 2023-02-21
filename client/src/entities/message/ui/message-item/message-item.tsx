import { memo, useCallback } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../../../../shared/lib/hooks";
import { selectMessage, deselectMessage, createMessage, IMessage } from "../../model";
import { MessageReadCheck } from "../../../../shared/ui";
import { IFriend } from "../../../friend";

import { RepliedMessageItem } from "./replied-message-item";

interface MessageItemProps {
    friend: IFriend;
    message: IMessage;
}

interface ForwardedProps {
    to: string;
    from: string;
}

const StyledContainer = styled.div<MessageItemProps>`
    background: ${({ message, friend }) => (message.to !== friend.userBehindFriend ? "#1677ff" : "lightgray")};
    color: ${({ message, friend }) => (message.to !== friend.userBehindFriend ? "whitesmoke" : "black")};
    border: 1px solid ${({ message, friend }) => (message.to !== friend.userBehindFriend ? "#1677ff" : "lightgray")};
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-radius: 20px;
    margin: ${({ message, friend }) =>
        message.to === friend.userBehindFriend ? "0.5rem 0.5rem 1rem auto" : "0.5rem auto 1rem 0.5rem"};
    padding: 0.5rem 1rem;
    max-width: 50%;
    word-break: break-word;
    filter: ${({ message }) => message.isMessageSelected && "blur(2px)"};
    cursor: pointer;
`;

const StyledMessageContentHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    padding-right: 0.2rem;
`;

const StyledForwarded = styled.p<ForwardedProps>`
    font-size: 16px;
    font-style: italic;
    color: ${({ to, from }) => (to === from ? "whitesmoke" : "black")};
`;

export const MessageItem = memo<MessageItemProps>(({ friend, message }) => {
    const {
        to,
        from,
        content,
        messageId,
        isMessageRead,
        isMessageForwarded,
        isMessageSelected,
        prevMessageContent,
        prevMessageFrom,
    } = message;
    const dispatch = useAppDispatch();
    const handleClick = useCallback(() => {
        if (!isMessageSelected) {
            dispatch(
                selectMessage(
                    createMessage({
                        to: to,
                        from: from,
                        content: content,
                        messageId: messageId,
                        isMessageSelected: true,
                        isMessageRead: isMessageRead,
                        isMessageForwarded: isMessageForwarded,
                        prevMessageContent: prevMessageContent,
                        prevMessageFrom: prevMessageFrom,
                    }),
                ),
            );
        } else {
            dispatch(
                deselectMessage(
                    createMessage({
                        to: to,
                        from: from,
                        content: content,
                        messageId: messageId,
                        isMessageSelected: false,
                        isMessageRead: isMessageRead,
                        isMessageForwarded: isMessageForwarded,
                        prevMessageContent: prevMessageContent,
                        prevMessageFrom: prevMessageFrom,
                    }),
                ),
            );
        }
    }, [
        content,
        dispatch,
        from,
        isMessageForwarded,
        isMessageRead,
        isMessageSelected,
        messageId,
        to,
        prevMessageContent,
        prevMessageFrom,
    ]);

    return (
        <StyledContainer friend={friend} message={message} onClick={handleClick}>
            {isMessageForwarded && (
                <StyledForwarded to={message.to} from={message.from}>
                    Forwarded from {message.forwardedFrom}
                </StyledForwarded>
            )}
            {message.prevMessageContent && message.prevMessageFrom && (
                <RepliedMessageItem prevMessageFrom={message.prevMessageFrom} content={message.prevMessageContent} />
            )}
            <StyledMessageContentHolder>
                <p>{message.content}</p>
            </StyledMessageContentHolder>
            <MessageReadCheck isMessageRead={message.isMessageRead} />
        </StyledContainer>
    );
});
