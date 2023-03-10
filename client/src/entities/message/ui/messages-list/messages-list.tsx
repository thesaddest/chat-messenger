import { memo, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { MessageItem } from "../message-item";
import { IFriend } from "../../../friend";
import { getFilteredMessageBySender, IMessage, readMessages } from "../../model";
import { useAppDispatch, useAppSelector, useIsInViewport } from "../../../../shared/lib/hooks";
import { ScrollToBottom } from "../../../../features/scroll-to-bottom";

interface IMessagesListProps {
    friend: IFriend;
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

export const MessagesList = memo<IMessagesListProps>(({ friend, messages, selectedMessageToReply }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);
    const bottomDiv = useRef<HTMLDivElement>(null);
    const memoizedFilteredMessages = useMemo(() => getFilteredMessageBySender(messages, friend), [messages, friend]);
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
        if (memoizedFilteredMessages.length > 0 && user && friendIdActiveKey === friend.userBehindFriend) {
            dispatch(readMessages({ messages: memoizedFilteredMessages, user: user }));
        }
    }, [dispatch, friend.userBehindFriend, friendIdActiveKey, memoizedFilteredMessages, user]);

    return (
        <StyledWrapper selectedMessageToReply={selectedMessageToReply}>
            {messages &&
                memoizedFilteredMessages.map((msg, msgIndex) => (
                    <MessageItem friend={friend} key={msgIndex + msg.content} message={msg} />
                ))}
            {isButtonVisible && <ScrollToBottom bottomDiv={bottomDiv} />}
            <div ref={bottomDiv}></div>
        </StyledWrapper>
    );
});
