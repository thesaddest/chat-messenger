import { Modal } from "antd";
import { memo, useCallback, useState } from "react";
import styled from "styled-components";

import { deselectAllSelectedMessages, IMessage } from "../../entities/message";
import { useAppDispatch } from "../../shared/lib/hooks";
import { Close, Delete, NavbarButton } from "../../shared/ui";

import { DeleteMessagesPopupContent } from "./delete-messages-popup-content";

interface IDeleteMessagesProps {
    selectedMessages: IMessage[];
}

const StyledButtonContainer = styled.div`
    padding: 0.25rem;
`;

export const DeleteMessages = memo<IDeleteMessagesProps>(({ selectedMessages }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleClick = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCancel = useCallback(() => {
        dispatch(deselectAllSelectedMessages(selectedMessages));
    }, [dispatch, selectedMessages]);

    const handleModalCancel = useCallback(() => {
        dispatch(deselectAllSelectedMessages(selectedMessages));
        setIsModalOpen(false);
    }, [dispatch, selectedMessages]);

    return (
        <>
            <StyledButtonContainer>
                <NavbarButton type="primary" danger onClick={handleClick}>
                    <Delete />
                </NavbarButton>
            </StyledButtonContainer>
            <StyledButtonContainer>
                <NavbarButton type="dashed" onClick={handleCancel}>
                    <Close />
                </NavbarButton>
            </StyledButtonContainer>
            <Modal open={isModalOpen} onCancel={handleModalCancel} centered={true} footer={null}>
                <DeleteMessagesPopupContent selectedMessages={selectedMessages} />
            </Modal>
        </>
    );
});
