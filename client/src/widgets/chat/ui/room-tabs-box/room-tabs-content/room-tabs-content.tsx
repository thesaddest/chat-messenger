import { FC } from "react";
import styled from "styled-components";

import { IMessage } from "../../../../../entities/message";
import { useAppSelector } from "../../../../../shared/lib/hooks";
import { IRoom } from "../../../../../entities/room";
import { RoomChatInfo } from "../../room-chat-info";
import { ChatInputBox } from "../../chat-input-box";
import { RepliedMessage } from "../../replied-message";

import { RoomMessagesList } from "./room-messages-list";

interface IRoomTabsContentProps {
    room: IRoom;
    messages: IMessage[];
}

const StyledRoomTabsContent = styled.div`
    height: 75vh;
`;

export const RoomTabsContent: FC<IRoomTabsContentProps> = ({ room, messages }) => {
    const selectedMessageToReply = useAppSelector((state) => state.message.selectedMessageToReply);

    return (
        <StyledRoomTabsContent>
            <RoomChatInfo room={room} />
            <RoomMessagesList room={room} messages={messages} selectedMessageToReply={selectedMessageToReply} />
            <RepliedMessage selectedMessageToReply={selectedMessageToReply} />
            <ChatInputBox friendId={room.roomId} />
        </StyledRoomTabsContent>
    );
};
