import { memo, SyntheticEvent, useCallback, useState } from "react";
import { FileUnknownOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import styled from "styled-components";

import { MenuButton } from "../../shared/ui";
import { useAppDispatch, useModal } from "../../shared/lib/hooks";
import { deleteMessages, IMessage } from "../../entities/message";

import { RevealHiddenMessagePopupContent } from "./reveal-hidden-message-popup-content";

const StyledButtonContainer = styled.div`
    padding: 0.25rem;
`;

interface IRevealHiddenMessageProps {
    messageToReveal: IMessage;
}

export const RevealHiddenMessage = memo<IRevealHiddenMessageProps>(({ messageToReveal }) => {
    const [isMessageRevealed, setIsMessageRevealed] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { isModalOpen, modalError, setModalError, setIsModalOpen } = useModal();

    const handleCancel = useCallback(
        (e: SyntheticEvent) => {
            if (isMessageRevealed) {
                dispatch(deleteMessages([messageToReveal]));
            }
            e.stopPropagation();
            setIsModalOpen(false);
            setModalError("");
        },
        [dispatch, isMessageRevealed, messageToReveal, setIsModalOpen, setModalError],
    );

    const handleClick = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    return (
        <>
            <StyledButtonContainer>
                <MenuButton type={"dashed"} onClick={handleClick}>
                    <FileUnknownOutlined /> Reveal
                </MenuButton>
            </StyledButtonContainer>
            <Modal open={isModalOpen} centered={true} onCancel={handleCancel} footer={null}>
                <RevealHiddenMessagePopupContent
                    setIsMessageRevealed={setIsMessageRevealed}
                    messageToReveal={messageToReveal}
                    setIsModalOpen={setIsModalOpen}
                    modalError={modalError}
                    setModalError={setModalError}
                />
            </Modal>
        </>
    );
});
