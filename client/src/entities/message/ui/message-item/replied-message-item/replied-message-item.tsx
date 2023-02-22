import { memo } from "react";
import styled from "styled-components";

import { VerticalPipe } from "../../../../../shared/ui";

interface IRepliedMessageItemProps {
    prevMessageFrom: string;
    content: string;
}

const StyledContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: row;
`;

const StyledUsernameMessageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    width: 100%;
    flex-direction: column;

    p {
        font-size: 16px;
        font-weight: 600;
        color: whitesmoke;
    }
`;

export const RepliedMessageItem = memo<IRepliedMessageItemProps>(({ prevMessageFrom, content }) => {
    return (
        <StyledContainer>
            <VerticalPipe fontSize={"44px"} />
            <StyledUsernameMessageContainer>
                <p>{prevMessageFrom}</p>
                <span>{content}</span>
            </StyledUsernameMessageContainer>
        </StyledContainer>
    );
});
