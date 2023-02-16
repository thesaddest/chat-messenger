import { Button } from "antd";
import { FC, useCallback } from "react";

import styled from "styled-components";

import { deleteMessages, deselectAllSelectedMessages, IMessage } from "../../../entities/message";
import { Delete, MemoTitle } from "../../../shared/ui";
import { useAppDispatch } from "../../../shared/lib/hooks";

interface IDeleteMessagesPopupContentProps {
    selectedMessages: IMessage[];
}

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const StyledButtonsContainer = styled.div`
    display: flex;
    width: 70%;
    justify-content: space-evenly;
    align-items: center;
`;

export const DeleteMessagesPopupContent: FC<IDeleteMessagesPopupContentProps> = ({ selectedMessages }) => {
    const dispatch = useAppDispatch();

    const handleCancel = useCallback(() => {
        dispatch(deselectAllSelectedMessages(selectedMessages));
    }, [dispatch, selectedMessages]);

    const handleDelete = useCallback(() => {
        dispatch(deleteMessages(selectedMessages));
        dispatch(deselectAllSelectedMessages(selectedMessages));
    }, [dispatch, selectedMessages]);

    return (
        <StyledContainer>
            <MemoTitle title="Are you sure?" />
            <StyledButtonsContainer>
                <Button type="primary" danger onClick={handleDelete}>
                    Delete {selectedMessages.length} Messages <Delete />
                </Button>
                <Button type="primary" onClick={handleCancel}>
                    Cancel
                </Button>
            </StyledButtonsContainer>
        </StyledContainer>
    );
};
