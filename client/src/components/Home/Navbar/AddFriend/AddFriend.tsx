import { Button, Form, Input, Modal, Typography } from "antd";
import { FC, SyntheticEvent, useState } from "react";
import { UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { AUTH_RULES } from "../../../Auth/auth.constants";

import { IAddFriendValues } from "./interfaces";

const { Title } = Typography;

const StyledTitle = styled(Title)`
    margin-bottom: 0;
    padding-right: 1rem;
    padding-left: 2rem;
`;

export const AddFriend: FC = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (e: SyntheticEvent) => {
        e.stopPropagation();
        setIsModalOpen(false);
    };

    const handleCancel = (e: SyntheticEvent) => {
        e.stopPropagation();
        setIsModalOpen(false);
    };

    const onFinish = (values: IAddFriendValues) => {
        form.resetFields();
        console.log(values);
    };

    return (
        <>
            <StyledTitle level={4}>Add Friend</StyledTitle>
            <Button onClick={showModal}>
                <Modal
                    title="Add a friend!"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    onOk={handleOk}
                    okButtonProps={{ htmlType: "submit", form: "add-friend-form" }}
                    centered={true}
                >
                    <Form form={form} name="add-friend-form" onFinish={onFinish}>
                        <Form.Item name="username" rules={AUTH_RULES.USERNAME}>
                            <Input prefix={<UserOutlined />} placeholder="Enter friend's username" />
                        </Form.Item>
                    </Form>
                </Modal>
                <UsergroupAddOutlined />
            </Button>
        </>
    );
};
