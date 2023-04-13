import { memo, useCallback } from "react";
import styled from "styled-components";
import { Button } from "antd";

import { deselectMessageToReply, IMessage } from "../../../entities/message";
import { Close, Reply } from "../../../shared/ui";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { COLORS } from "../../../shared/const";

interface IRepliedMessageProps {
    selectedMessageToReply: IMessage | null;
}

const StyledWrapper = styled.div<IRepliedMessageProps>`
    display: ${({ selectedMessageToReply }) => (selectedMessageToReply ? "" : "none")};
    justify-content: center;
    align-items: center;
    height: 5vh;
`;

const StyledContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background: white;
`;

const StyledButton = styled(Button)`
    border: 0;
    padding: 0.25rem;
    background: white;
`;

const StyledUsernameMessageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;

    p {
        font-size: 16px;
        font-weight: 600;
        color: ${COLORS.MAIN_BLUE};
    }

    span {
        width: 35vw;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

const StyledReplyContainer = styled.div`
    padding-left: 0.25rem;
`;

export const RepliedMessage = memo<IRepliedMessageProps>(({ selectedMessageToReply }) => {
    const dispatch = useAppDispatch();

    const onClick = useCallback(() => {
        dispatch(deselectMessageToReply());
    }, [dispatch]);

    return (
        <StyledWrapper selectedMessageToReply={selectedMessageToReply}>
            <StyledContainer>
                <StyledReplyContainer>
                    <Reply color={`${COLORS.MAIN_BLUE}`} fontSize={"20px"} />
                </StyledReplyContainer>
                <StyledUsernameMessageContainer>
                    <p>{selectedMessageToReply?.fromUsername}</p>
                    <span>{selectedMessageToReply && selectedMessageToReply.content}</span>
                </StyledUsernameMessageContainer>
                <div>
                    <StyledButton onClick={onClick}>
                        <Close color={`${COLORS.LIGHTGREY}`} fontSize={"20px"} />
                    </StyledButton>
                </div>
            </StyledContainer>
        </StyledWrapper>
    );
});
