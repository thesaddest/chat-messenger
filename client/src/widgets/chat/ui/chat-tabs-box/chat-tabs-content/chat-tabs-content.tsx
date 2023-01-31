import { FC } from "react";

import { IFriend } from "../../../../../entities/friend";
import { MessagesList } from "../../../../../entities/message/ui";
import { ChatInputBox } from "../../chat-input-box";

interface IChatTabsContentProps {
    friend: IFriend;
}

export const ChatTabsContent: FC<IChatTabsContentProps> = ({ friend }) => {
    return (
        <>
            <MessagesList friend={friend} />
            <ChatInputBox friendId={friend.userBehindFriend} />
        </>
    );
};
