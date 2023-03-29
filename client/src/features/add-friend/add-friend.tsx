import { ButtonProps, Form, Modal } from "antd";
import { memo, useMemo } from "react";
import { UserAddOutlined } from "@ant-design/icons";

import { useModal } from "../../shared/lib/hooks";
import { MenuButton } from "../../shared/ui";

import { AddFriendPopupContent } from "./add-friend-popup-content";

export const AddFriend = memo(() => {
    const [form] = Form.useForm();
    const { isModalOpen, showModal, modalError, setModalError, setIsModalOpen, handleCancel } = useModal();

    const OK_BUTTON_PROPS: ButtonProps = useMemo(() => ({ htmlType: "submit", form: "add-friend-form" }), []);

    return (
        <>
            <MenuButton onClick={showModal} type="primary">
                <UserAddOutlined /> Add a friend
            </MenuButton>
            <Modal
                title="Add a friend!"
                open={isModalOpen}
                okButtonProps={OK_BUTTON_PROPS}
                centered={true}
                onCancel={handleCancel}
            >
                <AddFriendPopupContent
                    form={form}
                    modalError={modalError}
                    setModalError={setModalError}
                    setIsModalOpen={setIsModalOpen}
                />
            </Modal>
        </>
    );
});
