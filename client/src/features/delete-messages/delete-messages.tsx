import { Button } from "antd";
import { memo, useCallback } from "react";
import styled from "styled-components";

import { deselectAllSelectedMessages, deleteMessages, IMessage } from "../../entities/message";
import { useAppDispatch } from "../../shared/lib/hooks";
import { Delete } from "../../shared/ui";

interface IDeleteMessagesProps {
    selectedMessages: IMessage[];
}

const StyledButtonContainer = styled.div`
    padding: 0.25rem;
`;

export const DeleteMessages = memo<IDeleteMessagesProps>(({ selectedMessages }) => {
    const dispatch = useAppDispatch();

    const handleDelete = useCallback(() => {
        dispatch(deleteMessages(selectedMessages));
        dispatch(deselectAllSelectedMessages(selectedMessages));
    }, [dispatch, selectedMessages]);

    const handleCancel = useCallback(() => {
        dispatch(deselectAllSelectedMessages(selectedMessages));
    }, [dispatch, selectedMessages]);

    return (
        <>
            <StyledButtonContainer>
                <Button type="primary" danger onClick={handleDelete}>
                    <Delete />
                </Button>
            </StyledButtonContainer>
            <StyledButtonContainer>
                <Button type="dashed" onClick={handleCancel}>
                    Cancel
                </Button>
            </StyledButtonContainer>
        </>
    );
});
