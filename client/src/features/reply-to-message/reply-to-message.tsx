import { memo, useCallback } from "react";
import { Button } from "antd";
import styled from "styled-components";

import { Reply } from "../../shared/ui";
import { deselectMessage, IMessage, replyToMessage } from "../../entities/message";
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
        dispatch(replyToMessage(selectedMessage));
    }, [dispatch, selectedMessage]);

    return (
        <StyledButtonContainer>
            <Button onClick={onClick} type="primary">
                <Reply />
            </Button>
        </StyledButtonContainer>
    );
});
