import { FC, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { MessageItem } from "../message-item";
import { IFriend } from "../../../friend";
import { IRoom } from "../../../room";
import { getFilteredMessageByChatType, IMessage, readMessages } from "../../model";
import { useAppDispatch, useAppSelector, useIsInViewport } from "../../../../shared/lib/hooks";
import { ScrollToBottom } from "../../../../features/scroll-to-bottom";

interface IMessagesListProps {
    chat: IFriend | IRoom;
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

export const MessagesList: FC<IMessagesListProps> = ({ chat, messages, selectedMessageToReply }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const memoizedFilteredMessages = useMemo(() => getFilteredMessageByChatType(messages, chat), [messages, chat]);
    const bottomDiv = useRef<HTMLDivElement>(null);
    const isInViewport = useIsInViewport(bottomDiv);
    const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);

    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);
    const roomIdActiveKey = useAppSelector((state) => state.room.roomIdActiveKey);

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
        if ("roomId" in chat) {
            if (memoizedFilteredMessages.length > 0 && user && roomIdActiveKey === chat.roomId) {
                dispatch(readMessages({ messages: memoizedFilteredMessages, user: user }));
            }
        } else {
            if (memoizedFilteredMessages.length > 0 && user && friendIdActiveKey === chat.userBehindFriend) {
                dispatch(readMessages({ messages: memoizedFilteredMessages, user: user }));
            }
        }
    }, [chat, dispatch, friendIdActiveKey, memoizedFilteredMessages, roomIdActiveKey, user]);

    return (
        <StyledWrapper selectedMessageToReply={selectedMessageToReply}>
            {messages &&
                memoizedFilteredMessages.map((msg, msgIndex) => (
                    <MessageItem chat={chat} key={msgIndex + msg.content} message={msg} />
                ))}
            {isButtonVisible && <ScrollToBottom bottomDiv={bottomDiv} />}
            <div ref={bottomDiv}></div>
        </StyledWrapper>
    );
};
