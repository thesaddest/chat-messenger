import { memo, useCallback } from "react";
import { FileUnknownOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import styled from "styled-components";

import { MenuButton } from "../../shared/ui";
import { useAppDispatch, useModal } from "../../shared/lib/hooks";
import { IMessage, revealHiddenMessage } from "../../entities/message";

const StyledButtonContainer = styled.div`
    padding: 0.25rem;
`;

interface IRevealHiddenMessageProps {
    messageToReveal: IMessage;
}

export const RevealHiddenMessage = memo<IRevealHiddenMessageProps>(({ messageToReveal }) => {
    const dispatch = useAppDispatch();
    const { isModalOpen, showModal, modalError, setModalError, setIsModalOpen, handleCancel } = useModal();

    const handleClick = useCallback(() => {
        setIsModalOpen(true);
        dispatch(revealHiddenMessage(messageToReveal));
    }, [setIsModalOpen, dispatch, messageToReveal]);

    return (
        <>
            <StyledButtonContainer>
                <MenuButton type={"dashed"} onClick={handleClick}>
                    <FileUnknownOutlined /> Reveal
                </MenuButton>
            </StyledButtonContainer>
            <Modal title="Add a friend!" open={isModalOpen} centered={true} onCancel={handleCancel}></Modal>
        </>
    );
});
