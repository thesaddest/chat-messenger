import { memo, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

import { MessageItem } from "../message-item";
import { IFriend } from "../../../friend";
import { filterMessageBySender, IMessage, readMessages } from "../../model";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";

interface IMessagesListProps {
    friend: IFriend;
    messages: IMessage[];
}

const StyledWrapper = styled.div`
    height: 60vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    text-align: center;

    @media only screen and (max-width: 425px) {
        height: 80vh;
    }
`;

export const MessagesList = memo<IMessagesListProps>(({ friend, messages }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);
    const bottomDiv = useRef<HTMLDivElement>(null);
    const memoizedFilteredMessages = useMemo(() => filterMessageBySender(messages, friend), [messages, friend]);

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
        <StyledWrapper>
            {messages &&
                memoizedFilteredMessages.map((msg, msgIndex) => (
                    <>
                        <MessageItem friendId={friend.userBehindFriend} key={msgIndex + msg.content} {...msg} />
                    </>
                ))}
            <div ref={bottomDiv}></div>
        </StyledWrapper>
    );
});
