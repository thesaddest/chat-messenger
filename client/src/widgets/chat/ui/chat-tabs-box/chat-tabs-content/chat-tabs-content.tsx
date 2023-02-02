import { FC } from "react";

import { IFriend } from "../../../../../entities/friend";
import { MessagesList } from "../../../../../entities/message/ui";
import { ChatInputBox } from "../../chat-input-box";
import { ChatInfo } from "../../chat-info";
import { IMessage } from "../../../../../entities/message";

interface IChatTabsContentProps {
    friend: IFriend;
    messages: IMessage[];
}

export const ChatTabsContent: FC<IChatTabsContentProps> = ({ friend, messages }) => {
    return (
        <>
            <ChatInfo friend={friend} />
            <MessagesList friend={friend} messages={messages} />
            <ChatInputBox friendId={friend.userBehindFriend} />
        </>
    );
};
