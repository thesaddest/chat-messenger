import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { Form, FormInstance, Input } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { AUTH_RULES } from "../../../shared/const";
import { ErrorAlert } from "../../../shared/ui";
import { IInviteFriendToRoomOnFinishValues, inviteFriendToJoinRoom } from "../../../entities/room";

import { createRoomNotification } from "../../../entities/notification";

import type { InputRef } from "antd";

interface IInviteFriendToRoomPopupContentProps {
    form: FormInstance;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setModalError: Dispatch<SetStateAction<string>>;
    modalError: string;
    roomName: string;
}

export const InviteFriendToRoomPopupContent: FC<IInviteFriendToRoomPopupContentProps> = ({
    form,
    setIsModalOpen,
    setModalError,
    modalError,
    roomName,
}) => {
    const inputRef = useRef<InputRef>(null);
    const dispatch = useAppDispatch();
    const roomIdActiveKey = useAppSelector((state) => state.room.roomIdActiveKey);
    const username = useAppSelector((state) => state.auth.user?.username);

    const onFinish = async ({ friendUsername }: IInviteFriendToRoomOnFinishValues) => {
        if (username) {
            const { payload } = await dispatch(
                inviteFriendToJoinRoom({
                    notificationId: "",
                    roomId: roomIdActiveKey,
                    roomName: roomName,
                    friendUsername: friendUsername,
                    sentBy: username,
                }),
            );

            if (typeof payload === "string") {
                return setModalError(payload);
            }

            dispatch(
                createRoomNotification({
                    roomName: roomName,
                    friendUsername: friendUsername,
                    roomId: roomIdActiveKey,
                    sentBy: username,
                }),
            );

            setIsModalOpen(false);
            form.resetFields();
        }
    };

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    });

    return (
        <Form form={form} name="invite-friend-to-room-form" onFinish={onFinish}>
            <Form.Item name="friendUsername" rules={AUTH_RULES.USERNAME}>
                <Input ref={inputRef} prefix={<UserAddOutlined />} placeholder="Enter friend's username" />
            </Form.Item>
            {modalError && <ErrorAlert type="error" message={modalError} />}
        </Form>
    );
};
