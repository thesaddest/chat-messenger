import styled from "styled-components";
import { Button } from "antd";
import { Dispatch, memo, SetStateAction, useCallback } from "react";

import { ChatType } from "../../../pages/home";

interface IChatSwitchProps {
    chatType: ChatType;
    setChatType: Dispatch<SetStateAction<ChatType>>;
}

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ChatSwitch = memo<IChatSwitchProps>(({ chatType, setChatType }) => {
    const handleClick = useCallback(
        () => setChatType(chatType === ChatType.FRIEND ? ChatType.ROOM : ChatType.FRIEND),
        [chatType, setChatType],
    );

    return (
        <StyledContainer>
            <Button onClick={handleClick} type={"primary"}>
                {chatType === ChatType.ROOM ? "Rooms" : "Friends"}
            </Button>
        </StyledContainer>
    );
});
