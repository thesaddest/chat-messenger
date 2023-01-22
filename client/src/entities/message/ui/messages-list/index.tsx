import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";

import { IFriend } from "../../../friend/model/interfaces";
import { IMessage } from "../../model/interfaces";
import { MessageItem } from "../message-item";
import { ChatInput } from "../../../../widgets/chat";

interface MessagesProps {
    messages: IMessage[];
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

export const MessagesList: FC<MessagesProps> = ({ messages, friend }) => {
    const bottomDiv = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (bottomDiv && bottomDiv.current) {
            bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
        }
    });

    //TODO: Separate ChatInput from Messages
    return (
        <>
            <StyledWrapper>
                {messages
                    .filter((message) =>
                        message.to === friend.userBehindFriend || message.from === friend.userBehindFriend,
                    )
                    .map((msg, msgIndex) =>
                        <MessageItem friendId={friend.userBehindFriend} key={msgIndex + msg.content} {...msg} />,
                    )}
                <div ref={bottomDiv}></div>
            </StyledWrapper>
            <ChatInput friendId={friend.userBehindFriend} />
        </>

    );
};
