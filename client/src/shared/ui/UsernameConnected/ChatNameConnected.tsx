import { memo } from "react";
import styled from "styled-components";
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { IFriend } from "../../../entities/friend";
import { IRoom, isChatIsRoom } from "../../../entities/room";
import { COLORS, SIZES } from "../../const";

interface IChatNameConnectedProps {
    chat: IRoom | IFriend;
}

const StyledChatNameConnectedContainer = styled.div`
    display: flex;

    p {
        font-size: 18px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        @media only screen and (max-width: ${SIZES.TABLET}) {
            font-size: 16px;
        }

        @media only screen and (max-width: ${SIZES.MOBILE}) {
            font-size: 18px;
        }
    }
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
                <p>{chat.roomName}</p>
            </StyledChatNameConnectedContainer>
        );
    } else {
        return (
            <>
                <StyledChatNameConnectedContainer>
                    <p>{chat.username}</p>
                    <StyledConnected>
                        {chat.connected ? <CheckCircleOutlined /> : <MinusCircleOutlined />}
                    </StyledConnected>
                </StyledChatNameConnectedContainer>
            </>
        );
    }
});
