import { memo, useCallback } from "react";
import styled from "styled-components";

import { NavbarButton, Reply } from "../../shared/ui";
import { deselectMessage, IMessage, selectMessageToReply } from "../../entities/message";
import { useAppDispatch } from "../../shared/lib/hooks";

interface IReplyToMessageProps {
    selectedMessage: IMessage;
}

const StyledButtonContainer = styled.div`
    padding: 0.25rem;
`;

export const ReplyToMessage = memo<IReplyToMessageProps>(({ selectedMessage }) => {
    const dispatch = useAppDispatch();

    const onClick = useCallback(() => {
        dispatch(deselectMessage(selectedMessage));
        dispatch(selectMessageToReply(selectedMessage));
    }, [dispatch, selectedMessage]);

    return (
        <StyledButtonContainer>
            <NavbarButton onClick={onClick} type="dashed">
                <Reply /> Reply
            </NavbarButton>
        </StyledButtonContainer>
    );
});
