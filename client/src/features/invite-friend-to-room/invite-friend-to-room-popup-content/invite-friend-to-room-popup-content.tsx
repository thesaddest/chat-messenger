import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { Form, FormInstance, Input } from "antd";

import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { AUTH_RULES } from "../../../shared/const";
import { ErrorAlert, AddFriendIcon } from "../../../shared/ui";
import { IInviteFriendToRoomOnFinishValues, inviteFriendToJoinRoom } from "../../../entities/room";

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
                <Input ref={inputRef} prefix={<AddFriendIcon />} placeholder="Enter friend's username" />
            </Form.Item>
            {modalError && <ErrorAlert type="error" message={modalError} />}
        </Form>
    );
};
