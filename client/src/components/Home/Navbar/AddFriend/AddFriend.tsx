import { Button, Form, Input, Modal, Typography } from "antd";
import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { UsergroupAddOutlined, UserAddOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { AUTH_RULES } from "../../../Auth/auth.constants";
import { socket } from "../../../../socket-io";
import { StyledAuthErrorAlert } from "../../../Auth/StyledAuthErrorAlert";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { addFriend } from "../../../../store/friend/friendSlice";
import { SOCKET_EVENTS } from "../../../../socket-io/socket.constants";
import { IFriend } from "../../../../api/interfaces";

import { IAddFriendValues } from "./interfaces";

import type { InputRef } from "antd";

interface IAddFriendCBValues {
    error: string;
    friend: IFriend;
}

const { Title } = Typography;

const StyledButton = styled(Button)`
  border: 1px solid slategray;
`;

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

    return (
        <>
            <Title level={4}>Add a friend</Title>
            <StyledButton onClick={showModal}>
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
                    {modalError && <StyledAuthErrorAlert type="error" message={modalError} />}
                </Modal>
                <UsergroupAddOutlined />
            </StyledButton>
        </>
    );
};
