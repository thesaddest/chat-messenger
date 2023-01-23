import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { Form, FormInstance, Input } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import { IAddFriendValues, IFriend } from "../../../entities/friend";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { socket } from "../../../shared/socket-io";
import { SOCKET_EVENTS } from "../../../shared/const";
import { addFriend } from "../../../entities/friend";
import { AUTH_RULES } from "../../../shared/const";
import { AuthErrorAlert } from "../../../shared/ui";

import type { InputRef } from "antd";

interface IAddFriendPopupContentProps {
    form: FormInstance;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setModalError: Dispatch<SetStateAction<string>>;
    modalError: string;
}

interface IAddFriendCBValues {
    error: string;
    friend: IFriend;
}

export const AddFriendPopupContent: FC<IAddFriendPopupContentProps> = ({
    form,
    setIsModalOpen,
    setModalError,
    modalError,
}) => {
    const inputRef = useRef<InputRef>(null);
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current?.focus();
        }
    });

    return (
        <Form form={form} name="add-friend-form" onFinish={onFinish}>
            <Form.Item name="username" rules={AUTH_RULES.USERNAME}>
                <Input ref={inputRef} prefix={<UserAddOutlined />} placeholder="Enter friend's username" />
            </Form.Item>
            {modalError && <AuthErrorAlert type="error" message={modalError} />}
        </Form>
    );
};
