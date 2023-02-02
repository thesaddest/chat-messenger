import { FC } from "react";

import { IFriend } from "../../../../../entities/friend";
import { MessagesList } from "../../../../../entities/message/ui";
import { ChatInputBox } from "../../chat-input-box";
import { ChatInfo } from "../../chat-info";

interface IChatTabsContentProps {
    friend: IFriend;
}

export const ChatTabsContent: FC<IChatTabsContentProps> = ({ friend }) => {
    return (
        <>
            <ChatInfo friend={friend} />
            <MessagesList friend={friend} />
            <ChatInputBox friendId={friend.userBehindFriend} />
        </>
    );
};
