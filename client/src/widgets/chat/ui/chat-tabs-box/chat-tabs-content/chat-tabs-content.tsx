import { FC } from "react";
import styled from "styled-components";

import { IFriend } from "../../../../../entities/friend";
import { MessagesList } from "../../../../../entities/message/ui";
import { ChatInputBox } from "../../chat-input-box";
import { ChatInfo } from "../../chat-info";
import { IMessage } from "../../../../../entities/message";
import { RepliedMessage } from "../../replied-message";
import { useAppSelector } from "../../../../../shared/lib/hooks";

interface IChatTabsContentProps {
    friend: IFriend;
    messages: IMessage[];
}

const StyledChatTabsContent = styled.div`
    height: 75vh;
`;

export const ChatTabsContent: FC<IChatTabsContentProps> = ({ friend, messages }) => {
    const repliedMessage = useAppSelector((state) => state.message.repliedMessage);

    return (
        <StyledChatTabsContent>
            <ChatInfo friend={friend} />
            <MessagesList friend={friend} messages={messages} />
            {repliedMessage && <RepliedMessage friend={friend} repliedMessage={repliedMessage} />}
            <ChatInputBox friendId={friend.userBehindFriend} />
        </StyledChatTabsContent>
    );
};
