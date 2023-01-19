import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";

import { IMessage } from "../interfaces";
import { IFriend } from "../../../../api/interfaces";
import { ChatInputBox } from "../ChatInput/ChatInputBox";

import { MessageItem } from "./MessageItem";

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
`;

export const Messages: FC<MessagesProps> = ({ messages, friend }) => {
    const bottomDiv = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (bottomDiv && bottomDiv.current) {
            bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
        }
    });

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
            <ChatInputBox friendId={friend.userBehindFriend} />
        </>

    );
};
