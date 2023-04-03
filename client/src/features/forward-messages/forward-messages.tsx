import { memo, SyntheticEvent, useCallback, useState } from "react";
import { Form, Modal } from "antd";
import styled from "styled-components";
import { RollbackOutlined } from "@ant-design/icons";

import { IMessage, selectMessage } from "../../entities/message";
import { MenuButton } from "../../shared/ui";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks";

import { ForwardMessagesPopupContent } from "./forward-messages-popup-content";

interface IForwardMessages {
    selectedMessages: IMessage[];
}

const StyledButtonContainer = styled.div`
    padding: 0.25rem;
`;

export const ForwardMessages = memo<IForwardMessages>(({ selectedMessages }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
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
    const handleForwardButtonClick = useCallback(() => {
        dispatch(selectMessage(selectedMessages[0]));
        setIsModalOpen(true);
    }, [dispatch, selectedMessages]);

    return (
        friends && (
            <StyledButtonContainer>
                <MenuButton onClick={handleForwardButtonClick} type="dashed">
                    <RollbackOutlined /> Forward {selectedMessages.length > 1 && selectedMessages.length}
                </MenuButton>
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
