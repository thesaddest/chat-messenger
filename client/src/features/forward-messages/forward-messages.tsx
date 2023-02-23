import { memo, SyntheticEvent, useCallback, useState } from "react";
import { Form, Modal } from "antd";
import styled from "styled-components";

import { IMessage } from "../../entities/message";
import { ForwardMessage, NavbarButton } from "../../shared/ui";
import { useAppSelector } from "../../shared/lib/hooks";

import { ForwardMessagesPopupContent } from "./forward-messages-popup-content";

interface IForwardMessages {
    selectedMessages: IMessage[];
}

const StyledButtonContainer = styled.div`
    padding: 0.25rem;
`;

export const ForwardMessages = memo<IForwardMessages>(({ selectedMessages }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalSearchInputValue, setModalSearchInputValue] = useState<string>("");

    const friends = useAppSelector((state) => state.friend.friends);

    const handleCancel = useCallback(
        (e: SyntheticEvent) => {
            e.stopPropagation();
            setIsModalOpen(false);
            setModalSearchInputValue("");
            form.resetFields();
        },
        [form],
    );
    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    return (
        friends && (
            <StyledButtonContainer>
                <NavbarButton onClick={showModal} type="primary">
                    <ForwardMessage /> Forward
                </NavbarButton>
                <Modal title="Forward to..." open={isModalOpen} onCancel={handleCancel} centered={true} footer={null}>
                    <ForwardMessagesPopupContent
                        modalSearchInputValue={modalSearchInputValue}
                        friends={friends}
                        setModalSearchInputValue={setModalSearchInputValue}
                        form={form}
                        setIsModalOpen={setIsModalOpen}
                    />
                </Modal>
            </StyledButtonContainer>
        )
    );
});
