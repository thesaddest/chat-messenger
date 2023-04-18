import { memo } from "react";
import styled from "styled-components";
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { isChatIsRoom } from "../../../entities/room";
import { Chat, COLORS } from "../../const";
import { Username } from "../Username";

interface IChatNameConnectedProps {
    chat: Chat;
}

const StyledChatNameConnectedContainer = styled.div`
    display: flex;
`;

const StyledConnected = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 0.25rem;

    span.anticon.anticon-minus-circle {
        color: ${COLORS.MAIN_RED};
    }

    span.anticon.anticon-check-circle {
        color: ${COLORS.MAIN_GREEN};
    }
`;

export const ChatNameConnected = memo<IChatNameConnectedProps>(({ chat }) => {
    if (isChatIsRoom(chat)) {
        return (
            <StyledChatNameConnectedContainer>
                <Username>{chat.roomName}</Username>
            </StyledChatNameConnectedContainer>
        );
    } else {
        return (
            <>
                <StyledChatNameConnectedContainer>
                    <Username>{chat.username}</Username>
                    <StyledConnected>
                        {chat.connected ? <CheckCircleOutlined /> : <MinusCircleOutlined />}
                    </StyledConnected>
                </StyledChatNameConnectedContainer>
            </>
        );
    }
});
