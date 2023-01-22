import { Button, Form, Input, Modal, Typography } from "antd";
import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { UsergroupAddOutlined, UserAddOutlined } from "@ant-design/icons";

import { AUTH_RULES } from "../../../../shared/const/auth.constants";
import { socket } from "../../../../shared/socket-io/socketInstance";
import { AuthErrorAlert } from "../../../../shared/ui";
import { addFriend } from "../../index";
import { SOCKET_EVENTS } from "../../../../shared/const/socket.constants";
import { IAddFriendValues, IFriend } from "../../model/interfaces";
import { useAppDispatch } from "../../../../shared/lib/hooks/redux";

import type { InputRef } from "antd";

interface IAddFriendCBValues {
    error: string;
    friend: IFriend;
}

const { Title } = Typography;

export const AddFriend: FC = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalError, setModalError] = useState<string>("");
    const inputRef = useRef<InputRef>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (inputRef && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = (e: SyntheticEvent) => {
        e.stopPropagation();
        setModalError("");
        setIsModalOpen(false);
    };

    const onFinish = (values: IAddFriendValues) => {
        socket.emit(SOCKET_EVENTS.ADD_FRIEND, values.username, ({ error, friend }: IAddFriendCBValues) => {
            if (error) {
                return setModalError(error);
            }

            dispatch(addFriend(friend));
            setIsModalOpen(false);
            form.resetFields();
        });
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
                    <Form form={form} name="add-friend-form" onFinish={onFinish}>
                        <Form.Item name="username" rules={AUTH_RULES.USERNAME}>
                            <Input ref={inputRef} prefix={<UserAddOutlined />}
                                   placeholder="Enter friend's username" />
                        </Form.Item>
                    </Form>
                    {modalError && <AuthErrorAlert type="error" message={modalError} />}
                </Modal>
                <UsergroupAddOutlined />
            </Button>
        </>
    );
};
