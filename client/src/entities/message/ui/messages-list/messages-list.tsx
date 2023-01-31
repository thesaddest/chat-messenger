import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";

import { MessageItem } from "../message-item";
import { IFriend } from "../../../friend";
import { useAppSelector } from "../../../../shared/lib/hooks";

interface IMessagesListProps {
    friend: IFriend;
}

const StyledWrapper = styled.div`
    height: 60vh;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    text-align: center;

    @media only screen and (max-width: 425px) {
        height: 80vh;
    }
`;

export const MessagesList = memo<IMessagesListProps>(({ friend }) => {
    const bottomDiv = useRef<HTMLDivElement>(null);
    const messages = useAppSelector((state) => state.message.messages);

    useEffect(() => {
        if (bottomDiv.current) {
            bottomDiv.current.scrollIntoView({ behavior: "smooth" });
        }
    });

    return (
        <StyledWrapper>
            {messages &&
                messages
                    .filter(
                        (message) => message.to === friend.userBehindFriend || message.from === friend.userBehindFriend,
                    )
                    .map((msg, msgIndex) => (
                        <MessageItem friendId={friend.userBehindFriend} key={msgIndex + msg.content} {...msg} />
                    ))}
            <div ref={bottomDiv}></div>
        </StyledWrapper>
    );
});
