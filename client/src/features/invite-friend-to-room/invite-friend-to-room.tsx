import { memo, SyntheticEvent, useCallback, useMemo, useState } from "react";
import { Button, ButtonProps, Form, Modal } from "antd";
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons";

import { InviteFriendToRoomPopupContent } from "./invite-friend-to-room-popup-content";

interface IInviteFriendToRoomProps {
    roomName: string;
}

const StyledInviteFriendToRoom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const InviteFriendToRoom = memo<IInviteFriendToRoomProps>(({ roomName }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalError, setModalError] = useState<string>("");

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCancel = useCallback(
        (e: SyntheticEvent) => {
            e.stopPropagation();
            setIsModalOpen(false);
            setModalError("");
            form.resetFields();
        },
        [form],
    );

    const OK_BUTTON_PROPS: ButtonProps = useMemo(
        () => ({
            htmlType: "submit",
            form: "invite-friend-to-room-form",
        }),
        [],
    );

    return (
        <StyledInviteFriendToRoom>
            <Button onClick={showModal} type="primary">
                <UserAddOutlined />
            </Button>
            <Modal
                title="Invite friend to room"
                open={isModalOpen}
                onCancel={handleCancel}
                okButtonProps={OK_BUTTON_PROPS}
                centered={true}
            >
                <InviteFriendToRoomPopupContent
                    roomName={roomName}
                    form={form}
                    modalError={modalError}
                    setModalError={setModalError}
                    setIsModalOpen={setIsModalOpen}
                />
            </Modal>
        </StyledInviteFriendToRoom>
    );
});
