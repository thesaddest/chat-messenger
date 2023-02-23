import { memo, useCallback } from "react";
import styled from "styled-components";

import { createMessage, deselectMessage, IMessage, selectMessage } from "../../entities/message";
import { useAppDispatch } from "../../shared/lib/hooks";
import { NavbarButton, Select } from "../../shared/ui";

interface ISelectMessageProps {
    selectedMessage: IMessage;
}

const StyledButtonContainer = styled.div`
    padding: 0.25rem;
`;

export const SelectMessage = memo<ISelectMessageProps>(({ selectedMessage }) => {
    const dispatch = useAppDispatch();

    const handleClick = useCallback(() => {
        if (!selectedMessage.isMessageSelected) {
            dispatch(
                selectMessage(
                    createMessage({
                        to: selectedMessage.to,
                        from: selectedMessage.from,
                        content: selectedMessage.content,
                        messageId: selectedMessage.messageId,
                        isMessageSelected: true,
                        isMessageRead: selectedMessage.isMessageRead,
                        isMessageForwarded: selectedMessage.isMessageForwarded,
                        prevMessageContent: selectedMessage.prevMessageContent,
                        prevMessageFrom: selectedMessage.prevMessageFrom,
                    }),
                ),
            );
        } else {
            dispatch(
                deselectMessage(
                    createMessage({
                        to: selectedMessage.to,
                        from: selectedMessage.from,
                        content: selectedMessage.content,
                        messageId: selectedMessage.messageId,
                        isMessageSelected: false,
                        isMessageRead: selectedMessage.isMessageRead,
                        isMessageForwarded: selectedMessage.isMessageForwarded,
                        prevMessageContent: selectedMessage.prevMessageContent,
                        prevMessageFrom: selectedMessage.prevMessageFrom,
                    }),
                ),
            );
        }
    }, [
        dispatch,
        selectedMessage.content,
        selectedMessage.from,
        selectedMessage.isMessageForwarded,
        selectedMessage.isMessageRead,
        selectedMessage.isMessageSelected,
        selectedMessage.messageId,
        selectedMessage.prevMessageContent,
        selectedMessage.prevMessageFrom,
        selectedMessage.to,
    ]);
    return (
        <StyledButtonContainer>
            <NavbarButton onClick={handleClick} type={"primary"}>
                <Select /> Select
            </NavbarButton>
        </StyledButtonContainer>
    );
});
