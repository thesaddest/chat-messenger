import { Button } from "antd";
import { Dispatch, memo, SetStateAction, useCallback } from "react";
import styled from "styled-components";

interface IChatSwitchProps {
    isSwitched: boolean;
    setIsSwitched: Dispatch<SetStateAction<boolean>>;
}

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ChatSwitch = memo<IChatSwitchProps>(({ isSwitched, setIsSwitched }) => {
    const handleClick = useCallback(() => setIsSwitched((prevState) => !prevState), [setIsSwitched]);

    return (
        <StyledContainer>
            <Button onClick={handleClick} type={"primary"}>
                {isSwitched ? "Rooms" : "Friends"}
            </Button>
        </StyledContainer>
    );
});
