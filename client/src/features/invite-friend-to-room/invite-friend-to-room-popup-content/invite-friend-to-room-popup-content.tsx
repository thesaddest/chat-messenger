import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { Form, FormInstance, Input } from "antd";

import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { AUTH_RULES } from "../../../shared/const";
import { ErrorAlert, AddFriendIcon } from "../../../shared/ui";
import { ICreateRoomValues, IInviteFriendToRoomOnFinishValues } from "../../../entities/room";

import type { InputRef } from "antd";

interface IInviteFriendToRoomPopupContentProps {
    form: FormInstance;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setModalError: Dispatch<SetStateAction<string>>;
    modalError: string;
}

export const InviteFriendToRoomPopupContent: FC<IInviteFriendToRoomPopupContentProps> = ({
    form,
    setIsModalOpen,
    setModalError,
    modalError,
}) => {
    const inputRef = useRef<InputRef>(null);
    const dispatch = useAppDispatch();
    const roomIdActiveKey = useAppSelector((state) => state.room.roomIdActiveKey);

    const onFinish = async (values: IInviteFriendToRoomOnFinishValues) => {
        // inviteFriendToRoom({
        //     friendUsername: values.friendUsername,
        //     roomId: roomIdActiveKey,
        //     roomName: string,
        // });

        setIsModalOpen(false);
        form.resetFields();
    };

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    });

    return (
        <Form form={form} name="invite-friend-to-room-form" onFinish={onFinish}>
            <Form.Item name="username" rules={AUTH_RULES.USERNAME}>
                <Input ref={inputRef} prefix={<AddFriendIcon />} placeholder="Enter friend's username" />
            </Form.Item>
            {modalError && <ErrorAlert type="error" message={modalError} />}
        </Form>
    );
};
