import { ButtonProps, Form, Modal } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import { useMemo } from "react";

import { useModal } from "../../shared/lib/hooks";
import { MenuButton } from "../../shared/ui";

import { CreateRoomPopupContent } from "./create-room-popup-content";

export const CreateRoom = () => {
    const [form] = Form.useForm();
    const { isModalOpen, showModal, modalError, setModalError, setIsModalOpen, handleCancel } = useModal();

    const OK_BUTTON_PROPS: ButtonProps = useMemo(() => ({ htmlType: "submit", form: "create-room-form" }), []);

    return (
        <>
            <MenuButton type={"primary"} onClick={showModal}>
                <WechatOutlined /> Create a room
            </MenuButton>
            <Modal
                title="Create a room!"
                open={isModalOpen}
                onCancel={handleCancel}
                okButtonProps={OK_BUTTON_PROPS}
                centered={true}
            >
                <CreateRoomPopupContent
                    setModalError={setModalError}
                    setIsModalOpen={setIsModalOpen}
                    modalError={modalError}
                    form={form}
                />
            </Modal>
        </>
    );
};
