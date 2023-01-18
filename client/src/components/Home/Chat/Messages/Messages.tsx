import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";

import { IMessage } from "../interfaces";
import { IFriend } from "../../../../api/interfaces";

import { MessageItem } from "./MessageItem";

interface MessagesProps {
    messages: IMessage[];
    friend: IFriend;
}

const StyledWrapper = styled.div`
  padding-top: 0.9rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Messages: FC<MessagesProps> = ({ messages, friend }) => {
    const bottomDiv = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (bottomDiv && bottomDiv.current) {
            setTimeout(() => {
                bottomDiv.current?.scrollIntoView();
            }, 0);
        }
    });

    return (
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
    );

};
