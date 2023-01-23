import React, { FC } from "react";

import { IMessage } from "../../../../../entities/message";
import { IFriend } from "../../../../../entities/friend";
import { ChatInput } from "../../chat-input";
import { MessagesList } from "../../../../../entities/message/ui";

interface IChatTabsContentProps {
    friend: IFriend;
    messages: IMessage[];
}

export const ChatTabsContent: FC<IChatTabsContentProps> = ({ friend, messages }) => {
    return (
        <>
            <MessagesList messages={messages} friend={friend} />
            <ChatInput friendId={friend.userBehindFriend} />
        </>
    );
};
