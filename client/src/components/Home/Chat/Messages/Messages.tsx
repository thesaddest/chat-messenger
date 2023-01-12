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
        if (bottomDiv) {
            bottomDiv.current?.scrollIntoView();
        }
    });

    return (
        <StyledWrapper>
            {messages.map((message) =>
                <MessageItem friendId={friend.id} key={friend.id + message.content} {...message} />,
            )}
            <div ref={bottomDiv}></div>
        </StyledWrapper>
    );

};
