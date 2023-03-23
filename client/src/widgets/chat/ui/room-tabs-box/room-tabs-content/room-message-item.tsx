import { memo, MouseEventHandler, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Dropdown, MenuProps } from "antd";

import { IRoom } from "../../../../../entities/room";
import { deselectMessage, IMessage, selectMessage } from "../../../../../entities/message";
import { useAppDispatch, useAppSelector } from "../../../../../shared/lib/hooks";
import { ReplyToMessage } from "../../../../../features/reply-to-message";
import { ForwardMessages } from "../../../../../features/forward-messages";
import { CopyMessage } from "../../../../../features/copy-message";
import { SelectMessage } from "../../../../../features/select-message";
import { DeleteMessages } from "../../../../../features/delete-messages";
import { RepliedMessageItem } from "../../../../../entities/message/ui/replied-message-item";
import { AttachedFileList } from "../../../../../entities/file";
import { MessageReadCheck } from "../../../../../shared/ui";

interface IRoomMessageItemProps {
    room: IRoom;
    message: IMessage;
}

interface ForwardedProps {
    to: string;
    from: string;
}

const StyledContainer = styled.div<IRoomMessageItemProps>`
    background: ${({ message, room }) => (message.to !== room.roomId ? "#1677ff" : "lightgray")};
    color: ${({ message, room }) => (message.to !== room.roomId ? "whitesmoke" : "black")};
    border: 1px solid ${({ message, room }) => (message.to !== room.roomId ? "#1677ff" : "lightgray")};
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-radius: 20px;
    margin: ${({ message, room }) =>
        message.to === room.roomId ? "0.5rem 0.5rem 1rem auto" : "0.5rem auto 1rem 0.5rem"};
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

export const RoomMessageItem = memo<IRoomMessageItemProps>(({ room, message }) => {
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
        <Dropdown menu={{ items }} trigger={["contextMenu"]} disabled={selectedMessages.length > 0}>
            <StyledContainer room={room} message={message} onClick={handleClick}>
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

                {message.attachedFilesAfterUpload && (
                    <AttachedFileList attachedFilesAfterUpload={message.attachedFilesAfterUpload} />
                )}
                {message.fromUsername}
                <StyledMessageContentHolder>
                    <p>{message.content}</p>
                </StyledMessageContentHolder>

                <MessageReadCheck isMessageRead={message.isMessageRead} />
            </StyledContainer>
        </Dropdown>
    );
});
