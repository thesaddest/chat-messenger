import { Button, Form, Input, Modal, Typography } from "antd";
import { FC, SyntheticEvent, useState } from "react";
import { UsergroupAddOutlined, UserAddOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { AUTH_RULES } from "../../../Auth/auth.constants";

import { socket } from "../../../../socket-io";
import { StyledAuthErrorAlert } from "../../../Auth/StyledAuthErrorAlert";

import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { addFriend } from "../../../../store/friend/friendSlice";

import { IAddFriendValues, IFriend } from "./interfaces";

interface IAddFriendCBValues {
    done: boolean;
    error: string;
    friend: IFriend;
}

const { Title } = Typography;

const StyledTitle = styled(Title)`
    margin-bottom: 0;
    padding-right: 1rem;
    padding-left: 2rem;
`;

export const AddFriend: FC = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalError, setModalError] = useState<string>("");
    const dispatch = useAppDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = (e: SyntheticEvent) => {
        e.stopPropagation();
        setIsModalOpen(false);
    };

    const onFinish = (values: IAddFriendValues) => {
        socket.emit("add-friend", values.username, ({ error, friend }: IAddFriendCBValues) => {
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
            <StyledTitle level={4}>Add Friend</StyledTitle>
            <Button onClick={showModal}>
                <Modal
                    title="Add a friend!"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    okButtonProps={{ htmlType: "submit", form: "add-friend-form" }}
                    centered={true}
                >
                    <Form form={form} name="add-friend-form" onFinish={onFinish}>
                        <Form.Item name="username" rules={AUTH_RULES.USERNAME}>
                            <Input prefix={<UserAddOutlined />} placeholder="Enter friend's username" />
                        </Form.Item>
                    </Form>
                    {modalError && <StyledAuthErrorAlert type="error" message={modalError} />}
                </Modal>
                <UsergroupAddOutlined />
            </Button>
        </>
    );
};
