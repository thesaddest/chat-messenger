import { memo, MouseEventHandler, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Dropdown, MenuProps } from "antd";

import { deselectMessage, IMessage, selectMessage } from "../../model";
import { MessageReadCheck } from "../../../../shared/ui";
import { IFriend } from "../../../friend";

import { RepliedMessageItem } from "../replied-message-item";
import { ForwardMessages } from "../../../../features/forward-messages";
import { ReplyToMessage } from "../../../../features/reply-to-message";
import { CopyMessage } from "../../../../features/copy-message";
import { DeleteMessages } from "../../../../features/delete-messages";
import { SelectMessage } from "../../../../features/select-message";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";
import { AttachedFileList } from "../../../file";

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
    const selectedMessages = useAppSelector((state) => state.message.selectedMessages);
    const { isMessageForwarded, isMessageSelected } = message;
    const dispatch = useAppDispatch();

    const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(() => {
        if (selectedMessages.length > 0 && isMessageSelected) {
            dispatch(deselectMessage(message));
        }
        if (selectedMessages.length > 0 && !isMessageSelected) {
            dispatch(selectMessage(message));
        }
    }, [dispatch, isMessageSelected, message, selectedMessages.length]);

    const items: MenuProps["items"] | undefined = useMemo(
        () => [
            {
                label: <ReplyToMessage selectedMessage={message} />,
                key: 1,
            },
            {
                label: <ForwardMessages selectedMessages={[message]} />,
                key: 2,
            },

            {
                label: <CopyMessage selectedMessage={message} />,
                key: 3,
            },
            {
                label: <SelectMessage selectedMessage={message} />,
                key: 4,
            },
            {
                label: <DeleteMessages selectedMessages={[message]} />,
                key: 5,
            },
        ],
        [message],
    );

    return (
        <Dropdown menu={{ items }} trigger={["click"]} disabled={selectedMessages.length > 0}>
            <StyledContainer friend={friend} message={message} onClick={handleClick}>
                {isMessageForwarded && (
                    <StyledForwarded to={message.to} from={message.from}>
                        Forwarded from {message.forwardedFrom}
                    </StyledForwarded>
                )}

                {message.prevMessageContent && message.prevMessageFrom && (
                    <RepliedMessageItem
                        prevMessageFrom={message.prevMessageFrom}
                        content={message.prevMessageContent}
                    />
                )}

                <StyledMessageContentHolder>
                    <p>{message.content}</p>
                </StyledMessageContentHolder>

                {message.attachedFilesAfterUpload && (
                    <AttachedFileList attachedFilesAfterUpload={message.attachedFilesAfterUpload} />
                )}
                <MessageReadCheck isMessageRead={message.isMessageRead} />
            </StyledContainer>
        </Dropdown>
    );
});
