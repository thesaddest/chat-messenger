import { Button, ButtonProps, Form, Modal } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import { SyntheticEvent, useCallback, useMemo, useState } from "react";

import { CreateRoomPopupContent } from "./create-room-popup-content";

export const CreateRoom = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalError, setModalError] = useState<string>("");

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCancel = useCallback(
        (e: SyntheticEvent) => {
            e.stopPropagation();
            setIsModalOpen(false);
            form.resetFields();
        },
        [form],
    );

    const OK_BUTTON_PROPS: ButtonProps = useMemo(() => ({ htmlType: "submit", form: "create-room-form" }), []);

    return (
        <>
            <Button type={"primary"} onClick={showModal}>
                <WechatOutlined />
            </Button>
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
