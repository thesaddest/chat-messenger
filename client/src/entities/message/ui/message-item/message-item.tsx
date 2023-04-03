import { memo, MouseEventHandler, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Dropdown, MenuProps } from "antd";

import { deselectMessage, IMessage, selectMessage } from "../../model";
import { IFriend } from "../../../friend";
import { IRoom, isChatIsRoom } from "../../../room";
import { ForwardMessages } from "../../../../features/forward-messages";
import { ReplyToMessage } from "../../../../features/reply-to-message";
import { CopyMessage } from "../../../../features/copy-message";
import { DeleteMessages } from "../../../../features/delete-messages";
import { SelectMessage } from "../../../../features/select-message";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";
import { COLORS } from "../../../../shared/const";

import { MessageItemContent } from "./message-item-content";

interface MessageItemProps {
    chat: IFriend | IRoom;
    message: IMessage;
    userId: string;
}

const StyledFriendMessageContainer = styled.div<{ friend: IFriend; message: IMessage }>`
    background: ${({ message, friend }) =>
        message.to !== friend.userBehindFriend ? `${COLORS.MAIN_BLUE}` : `${COLORS.LIGHTGREY}`};
    color: ${({ message, friend }) =>
        message.to !== friend.userBehindFriend ? `${COLORS.MAIN_WHITE};` : `${COLORS.MAIN_BLACK}`};
    border: 1px solid
        ${({ message, friend }) =>
            message.to !== friend.userBehindFriend ? `${COLORS.MAIN_BLUE}` : `${COLORS.LIGHTGREY}`};
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

const StyledRoomMessageContainer = styled.div<{ room: IRoom; message: IMessage; userId: string }>`
    background: ${({ message, userId }) => (message.from !== userId ? `${COLORS.MAIN_BLUE}` : `${COLORS.LIGHTGREY}`)};
    color: ${({ message, userId }) => (message.from !== userId ? `${COLORS.MAIN_WHITE};` : `${COLORS.MAIN_BLACK}`)};
    border: 1px solid
        ${({ message, userId }) => (message.from !== userId ? `${COLORS.MAIN_BLUE}` : `${COLORS.LIGHTGREY}`)};
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-radius: 20px;
    margin: ${({ message, userId }) =>
        message.from === userId ? "0.5rem 0.5rem 1rem auto" : "0.5rem auto 1rem 0.5rem"};
    padding: 0.5rem 1rem;
    max-width: 50%;
    word-break: break-word;
    filter: ${({ message }) => message.isMessageSelected && "blur(2px)"};
    cursor: pointer;
`;

export const MessageItem = memo<MessageItemProps>(({ chat, message, userId }) => {
    const selectedMessages = useAppSelector((state) => state.message.selectedMessages);
    const {
        isMessageForwarded,
        isMessageSelected,
        to,
        from,
        forwardedFrom,
        prevMessageFrom,
        prevMessageContent,
        attachedFilesAfterUpload,
        content,
        isMessageRead,
        fromUsername,
        isGroupMessage,
        isHiddenMessage,
        s3Location,
    } = message;

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

    if (isChatIsRoom(chat)) {
        return (
            <Dropdown menu={{ items }} trigger={["contextMenu"]} disabled={selectedMessages.length > 0}>
                <StyledRoomMessageContainer room={chat} message={message} onClick={handleClick} userId={userId}>
                    <MessageItemContent
                        to={to}
                        from={from}
                        content={content}
                        prevMessageContent={prevMessageContent}
                        prevMessageFrom={prevMessageFrom}
                        isMessageForwarded={isMessageForwarded}
                        isMessageRead={isMessageRead}
                        forwardedFrom={forwardedFrom}
                        attachedFilesAfterUpload={attachedFilesAfterUpload}
                        fromUsername={fromUsername}
                        isGroupMessage={isGroupMessage}
                        isHiddenMessage={isHiddenMessage}
                        s3Location={s3Location}
                    />
                </StyledRoomMessageContainer>
            </Dropdown>
        );
    } else {
        return (
            <Dropdown menu={{ items }} trigger={["contextMenu"]} disabled={selectedMessages.length > 0}>
                <StyledFriendMessageContainer friend={chat} message={message} onClick={handleClick}>
                    <MessageItemContent
                        to={to}
                        from={from}
                        content={content}
                        prevMessageContent={prevMessageContent}
                        prevMessageFrom={prevMessageFrom}
                        isMessageForwarded={isMessageForwarded}
                        isMessageRead={isMessageRead}
                        forwardedFrom={forwardedFrom}
                        attachedFilesAfterUpload={attachedFilesAfterUpload}
                        fromUsername={fromUsername}
                        isGroupMessage={isGroupMessage}
                        isHiddenMessage={isHiddenMessage}
                        s3Location={s3Location}
                    />
                </StyledFriendMessageContainer>
            </Dropdown>
        );
    }
});
