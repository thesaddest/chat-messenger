import { memo, RefObject, useCallback } from "react";
import styled from "styled-components";
import { Button } from "antd";

import { Down } from "../../shared/ui";

interface IScrollToBottomProps {
    bottomDiv: RefObject<HTMLDivElement>;
}

const StyledButton = styled(Button)`
    position: absolute;
    bottom: 15%;
    right: 0;
    padding: 0.25rem;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    background: whitesmoke;
    color: black;
    border: 0;
`;

export const ScrollToBottom = memo<IScrollToBottomProps>(({ bottomDiv }) => {
    const handleClick = useCallback(() => {
        if (bottomDiv.current) {
            bottomDiv.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [bottomDiv]);

    return (
        <StyledButton onClick={handleClick}>
            <Down />
        </StyledButton>
    );
});
