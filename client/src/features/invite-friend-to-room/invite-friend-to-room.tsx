import { Button, ButtonProps, Form, Modal } from "antd";
import { memo, SyntheticEvent, useCallback, useMemo, useState } from "react";

import { AddFriendIcon } from "../../shared/ui";

import { InviteFriendToRoomPopupContent } from "./invite-friend-to-room-popup-content";

export const InviteFriendToRoom = memo(() => {
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
        <>
            <Button onClick={showModal} type="primary">
                <AddFriendIcon />
            </Button>
            <Modal
                title="Invite friend to room"
                open={isModalOpen}
                onCancel={handleCancel}
                okButtonProps={OK_BUTTON_PROPS}
                centered={true}
            >
                <InviteFriendToRoomPopupContent
                    form={form}
                    modalError={modalError}
                    setModalError={setModalError}
                    setIsModalOpen={setIsModalOpen}
                />
            </Modal>
        </>
    );
});
