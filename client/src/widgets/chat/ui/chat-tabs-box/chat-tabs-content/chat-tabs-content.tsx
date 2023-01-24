import { FC } from "react";

import { IMessage } from "../../../../../entities/message";
import { IFriend } from "../../../../../entities/friend";
import { MessagesList } from "../../../../../entities/message/ui";
import { ChatInputBox } from "../../chat-input-box/chat-input-box";

interface IChatTabsContentProps {
    friend: IFriend;
    messages: IMessage[];
}

export const ChatTabsContent: FC<IChatTabsContentProps> = ({ friend, messages }) => {
    return (
        <>
            <MessagesList messages={messages} friend={friend} />
            <ChatInputBox friendId={friend.userBehindFriend} />
        </>
    );
};
