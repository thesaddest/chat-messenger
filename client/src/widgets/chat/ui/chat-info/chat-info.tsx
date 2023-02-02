import { FC } from "react";
import styled from "styled-components";

import { IFriend } from "../../../../entities/friend";
import { SharedAvatar, UsernameConnected } from "../../../../shared/ui";

interface IChatInfoProps {
    friend: IFriend;
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

export const ChatInfo: FC<IChatInfoProps> = ({ friend }) => {
    return (
        <ChatInfoContainer>
            <ChatInfoWrapper>
                <SharedAvatar height={"40px"} width={"40px"} />
                <UsernameConnected friend={friend} />
            </ChatInfoWrapper>
        </ChatInfoContainer>
    );
};
