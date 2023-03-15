import { FC } from "react";
import styled from "styled-components";

import { IFriend } from "../../../../../entities/friend";
import { MessagesList } from "../../../../../entities/message/ui";
import { ChatInfo } from "../../chat-info";
import { IMessage } from "../../../../../entities/message";
import { useAppSelector } from "../../../../../shared/lib/hooks";
import { RepliedMessage } from "../../replied-message";
import { ChatInputBox } from "../../chat-input-box";

interface IChatTabsContentProps {
    friend: IFriend;
    messages: IMessage[];
}

const StyledChatTabsContent = styled.div`
    height: 75vh;
`;

export const ChatTabsContent: FC<IChatTabsContentProps> = ({ friend, messages }) => {
    const selectedMessageToReply = useAppSelector((state) => state.message.selectedMessageToReply);

    return (
        <StyledChatTabsContent>
            <ChatInfo friend={friend} />
            <MessagesList friend={friend} messages={messages} selectedMessageToReply={selectedMessageToReply} />
            <RepliedMessage selectedMessageToReply={selectedMessageToReply} />
            <ChatInputBox friendId={friend.userBehindFriend} />
        </StyledChatTabsContent>
    );
};
