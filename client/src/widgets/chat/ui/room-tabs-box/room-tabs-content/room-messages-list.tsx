import { memo, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { IRoom } from "../../../../../entities/room";
import { IMessage, readMessages } from "../../../../../entities/message";
import { useAppDispatch, useAppSelector, useIsInViewport } from "../../../../../shared/lib/hooks";
import { getFilteredMessageByRoomSender } from "../../../../../entities/message/model/helpers";
import { ScrollToBottom } from "../../../../../features/scroll-to-bottom";

import { RoomMessageItem } from "./room-message-item";

interface IRoomMessagesListProps {
    room: IRoom;
    messages: IMessage[];
    selectedMessageToReply: IMessage | null;
}

interface IStyledWrapperProps {
    selectedMessageToReply: IMessage | null;
}

const StyledWrapper = styled.div<IStyledWrapperProps>`
    height: ${({ selectedMessageToReply }) => (selectedMessageToReply ? "55vh" : "60vh")};
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    text-align: center;

    @media only screen and (max-width: 425px) {
        height: ${({ selectedMessageToReply }) => (selectedMessageToReply ? "75vh" : "80vh")};
    }
`;

export const RoomMessagesList = memo<IRoomMessagesListProps>(({ room, messages, selectedMessageToReply }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);
    const bottomDiv = useRef<HTMLDivElement>(null);
    const memoizedFilteredMessages = useMemo(() => getFilteredMessageByRoomSender(messages, room), [messages, room]);
    const isInViewport = useIsInViewport(bottomDiv);
    const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);

    useEffect(() => {
        if (!isInViewport) {
            setIsButtonVisible(true);
        } else {
            setIsButtonVisible(false);
        }
    }, [isInViewport]);

    useEffect(() => {
        if (bottomDiv.current) {
            bottomDiv.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.length]);

    useEffect(() => {
        if (memoizedFilteredMessages.length > 0 && user && friendIdActiveKey === room.roomId) {
            dispatch(readMessages({ messages: memoizedFilteredMessages, user: user }));
        }
    }, [dispatch, friendIdActiveKey, memoizedFilteredMessages, room.roomId, user]);

    return (
        <StyledWrapper selectedMessageToReply={selectedMessageToReply}>
            {messages &&
                memoizedFilteredMessages.map((msg, msgIndex) => (
                    <RoomMessageItem room={room} key={msgIndex + msg.content} message={msg} />
                ))}
            {isButtonVisible && <ScrollToBottom bottomDiv={bottomDiv} />}
            <div ref={bottomDiv}></div>
        </StyledWrapper>
    );
});
