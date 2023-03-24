import { memo } from "react";
import styled from "styled-components";

import { IFriend } from "../../../../entities/friend";
import { SharedAvatar, ChatNameConnected } from "../../../../shared/ui";
import { IRoom } from "../../../../entities/room";

interface IChatInfoProps {
    chat: IFriend | IRoom;
}

const ChatInfoContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    height: 5vh;
    width: 100%;
    border-bottom: 1px solid lightgray;
`;

const ChatInfoWrapper = styled.div`
    display: flex;
    padding: 0 1rem;
    align-items: center;
`;

export const ChatInfo = memo<IChatInfoProps>(({ chat }) => {
    return (
        <ChatInfoContainer>
            <ChatInfoWrapper>
                <SharedAvatar height={"40px"} width={"40px"} />
                <ChatNameConnected chat={chat} />
            </ChatInfoWrapper>
        </ChatInfoContainer>
    );
});
