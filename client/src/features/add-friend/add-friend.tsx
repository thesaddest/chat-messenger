import { Button, Form, Modal, Typography } from "antd";
import { FC, SyntheticEvent, useState } from "react";
import { UsergroupAddOutlined } from "@ant-design/icons";

import { AddFriendPopupContent } from "./add-friend-popup-content";

const { Title } = Typography;

export const AddFriend: FC = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalError, setModalError] = useState<string>("");

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = (e: SyntheticEvent) => {
        e.stopPropagation();
        setIsModalOpen(false);
        setModalError("");
        form.resetFields();
    };

    //TODO: Separate business logic from ui

    return (
        <>
            <Title level={4}>Add a friend</Title>
            <Button onClick={showModal} type={"primary"}>
                <Modal
                    title="Add a friend!"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    okButtonProps={{ htmlType: "submit", form: "add-friend-form" }}
                    centered={true}
                >
                    <AddFriendPopupContent
                        form={form}
                        modalError={modalError}
                        setModalError={setModalError}
                        setIsModalOpen={setIsModalOpen}
                    />
                </Modal>
                <UsergroupAddOutlined />
            </Button>
        </>
    );
};
