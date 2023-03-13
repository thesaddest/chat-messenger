import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { Form, FormInstance, Input } from "antd";
import { WechatOutlined } from "@ant-design/icons";

import { useAppDispatch } from "../../../shared/lib/hooks";
import { CHAT_RULES } from "../../../shared/const";
import { ErrorAlert } from "../../../shared/ui";
import { createRoom, ICreateRoomValues } from "../../../entities/room";

import type { InputRef } from "antd";

interface ICreateRoomPopupContentProps {
    form: FormInstance;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setModalError: Dispatch<SetStateAction<string>>;
    modalError: string;
}

export const CreateRoomPopupContent: FC<ICreateRoomPopupContentProps> = ({
    form,
    setIsModalOpen,
    setModalError,
    modalError,
}) => {
    const inputRef = useRef<InputRef>(null);
    const dispatch = useAppDispatch();

    const onFinish = async (values: ICreateRoomValues) => {
        const { payload } = await dispatch(createRoom(values));

        if (typeof payload === "string") {
            return setModalError(payload);
        }

        setIsModalOpen(false);
        form.resetFields();
    };

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    });

    return (
        <Form form={form} name="create-room-form" onFinish={onFinish}>
            <Form.Item name="roomName" rules={CHAT_RULES.ROOM_NAME}>
                <Input ref={inputRef} prefix={<WechatOutlined />} placeholder="Enter the group name" />
            </Form.Item>
            {modalError && <ErrorAlert type="error" message={modalError} />}
        </Form>
    );
};
