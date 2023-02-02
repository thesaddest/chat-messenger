import { memo, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

import { MessageItem } from "../message-item";
import { IFriend } from "../../../friend";
import { filterMessageBySender, IMessage } from "../../model";

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
    padding: 0 1rem;

    @media only screen and (max-width: 425px) {
        height: 80vh;
    }
`;

export const MessagesList = memo<IMessagesListProps>(({ friend, messages }) => {
    const bottomDiv = useRef<HTMLDivElement>(null);

    const memoizedFilteredMessages = useMemo(() => filterMessageBySender(messages, friend), [messages, friend]);

    useEffect(() => {
        if (bottomDiv.current) {
            bottomDiv.current.scrollIntoView({ behavior: "smooth" });
        }
    });

    return (
        <StyledWrapper>
            {messages &&
                memoizedFilteredMessages.map((msg, msgIndex) => (
                    <MessageItem friendId={friend.userBehindFriend} key={msgIndex + msg.content} {...msg} />
                ))}
            <div ref={bottomDiv}></div>
        </StyledWrapper>
    );
});
