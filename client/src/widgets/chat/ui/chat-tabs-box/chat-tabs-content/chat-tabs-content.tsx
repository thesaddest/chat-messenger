import { FC } from "react";
import styled from "styled-components";

import { IFriend } from "../../../../../entities/friend";
import { MessagesList } from "../../../../../entities/message/ui";
import { ChatInfo } from "../../chat-info";
import { IMessage } from "../../../../../entities/message";
import { useAppSelector } from "../../../../../shared/lib/hooks";
import { RepliedMessage } from "../../replied-message";
import { ChatInputBox } from "../../chat-input-box";
import { IRoom } from "../../../../../entities/room";

interface IChatTabsContentProps {
    chat: IFriend | IRoom;
    messages: IMessage[];
}

const StyledChatTabsContent = styled.div`
    height: 75vh;
`;

export const ChatTabsContent: FC<IChatTabsContentProps> = ({ chat, messages }) => {
    const selectedMessageToReply = useAppSelector((state) => state.message.selectedMessageToReply);

    return (
        <StyledChatTabsContent>
            <ChatInfo chat={chat} />
            <MessagesList chat={chat} messages={messages} selectedMessageToReply={selectedMessageToReply} />
            <RepliedMessage selectedMessageToReply={selectedMessageToReply} />
            {"roomId" in chat ? <ChatInputBox chatId={chat.roomId} /> : <ChatInputBox chatId={chat.userBehindFriend} />}
        </StyledChatTabsContent>
    );
};
