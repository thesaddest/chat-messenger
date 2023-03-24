import { Modal } from "antd";
import { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";

import { deselectAllSelectedMessages, IMessage } from "../../entities/message";
import { useAppDispatch } from "../../shared/lib/hooks";
import { MenuButton } from "../../shared/ui";

import { DeleteMessagesPopupContent } from "./delete-messages-popup-content";

interface IDeleteMessagesProps {
    selectedMessages: IMessage[];
}

const StyledButtonContainer = styled.div`
    padding: 0.25rem;
`;

export const DeleteMessages = memo<IDeleteMessagesProps>(({ selectedMessages }) => {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleModalCancel = useCallback(() => {
        dispatch(deselectAllSelectedMessages(selectedMessages));
        setIsModalOpen(false);
    }, [dispatch, selectedMessages]);

    return (
        <>
            <StyledButtonContainer>
                <MenuButton type="dashed" danger onClick={handleClick}>
                    <DeleteOutlined /> Delete {selectedMessages.length > 1 && selectedMessages.length}
                </MenuButton>
            </StyledButtonContainer>
            <Modal open={isModalOpen} onCancel={handleModalCancel} centered={true} footer={null}>
                <DeleteMessagesPopupContent selectedMessages={selectedMessages} />
            </Modal>
        </>
    );
});
