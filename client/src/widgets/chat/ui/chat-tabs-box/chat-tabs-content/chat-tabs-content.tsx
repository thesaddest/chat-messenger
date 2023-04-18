import { FC } from "react";
import styled from "styled-components";

import { MessagesList } from "../../../../../entities/message/ui";
import { ChatInfo } from "../../chat-info";
import { IMessage } from "../../../../../entities/message";
import { useAppSelector } from "../../../../../shared/lib/hooks";
import { RepliedMessage } from "../../../../../features/reply-to-message";
import { ChatInputBox } from "../../chat-input-box";
import { isChatIsRoom } from "../../../../../entities/room";
import { Chat } from "../../../../../shared/const";

interface IChatTabsContentProps {
    chat: Chat;
    messages: IMessage[];
}

const StyledChatTabsContent = styled.div`
    height: 75vh;
`;

export const ChatTabsContent: FC<IChatTabsContentProps> = ({ chat, messages }) => {
    const selectedMessageToReply = useAppSelector((state) => state.message.selectedMessageToReply);
    const chatId = "roomId" in chat ? chat.roomId : chat.userBehindFriend;

    return (
        <StyledChatTabsContent>
            <ChatInfo chat={chat} />
            <MessagesList chat={chat} messages={messages} selectedMessageToReply={selectedMessageToReply} />
            <RepliedMessage selectedMessageToReply={selectedMessageToReply} />
            <ChatInputBox chatId={chatId} isChatIsRoom={isChatIsRoom(chat)} />
        </StyledChatTabsContent>
    );
};
