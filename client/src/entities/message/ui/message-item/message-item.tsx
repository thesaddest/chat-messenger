import { FC, useCallback } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";
import { selectMessage, deselectMessage, createMessage, IMessage } from "../../model";
import { MessageReadCheck } from "../../../../shared/ui";

interface MessageItemProps {
    friendId: string;
    message: IMessage;
}

interface ForwardedProps {
    to: string;
    from: string;
}

const StyledContainer = styled.div<MessageItemProps>`
    background: ${({ message, friendId }) => (message.to !== friendId ? "#1677ff" : "lightgray")};
    color: ${({ message, friendId }) => (message.to !== friendId ? "whitesmoke" : "black")};
    border: 1px solid ${({ message, friendId }) => (message.to !== friendId ? "#1677ff" : "lightgray")};
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-radius: 20px;
    margin: ${({ message, friendId }) => (message.to === friendId ? "0 0 1rem auto" : "0 auto 1rem 0")};
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    max-width: 50%;
    word-break: break-word;
    filter: ${({ message }) => message.isMessageSelected && "blur(2px)"};
    cursor: pointer;
`;

const StyledMessageContentHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-right: 0.2rem;
`;

const StyledForwarded = styled.p<ForwardedProps>`
  font-size: 16px;
  font-style: italic;
  color: ${({ to, from }) => (to === from ? "whitesmoke" : "black")})}

;
`;

export const MessageItem: FC<MessageItemProps> = ({ friendId, message }) => {
    const { to, from, content, messageId, isMessageRead, isMessageForwarded, isPrevMessageReplied, isMessageSelected } =
        message;
    const dispatch = useAppDispatch();
    const selectedMessageToReply = useAppSelector((state) => state.message.selectedMessageToReply);

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
                        isPrevMessageReplied: isPrevMessageReplied,
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
                        isPrevMessageReplied: isPrevMessageReplied,
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
        isPrevMessageReplied,
        isMessageSelected,
        messageId,
        to,
    ]);

    return (
        <StyledContainer friendId={friendId} message={message} onClick={handleClick}>
            {isMessageForwarded && (
                <StyledForwarded to={message.to} from={message.from}>
                    Forwarded from {message.forwardedFrom}
                </StyledForwarded>
            )}
            {isPrevMessageReplied && <div>{selectedMessageToReply?.content}</div>}
            <StyledMessageContentHolder>
                <p>{message.content}</p>
            </StyledMessageContentHolder>
            <MessageReadCheck isMessageRead={message.isMessageRead} />
        </StyledContainer>
    );
};
