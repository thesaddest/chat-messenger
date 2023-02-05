import { Button, ButtonProps, Form, Modal } from "antd";
import { memo, SyntheticEvent, useCallback, useMemo, useState } from "react";

import { AddFriendIcon } from "../../shared/ui";

import { AddFriendPopupContent } from "./add-friend-popup-content";

export const AddFriend = memo(() => {
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

    const OK_BUTTON_PROPS: ButtonProps = useMemo(() => ({ htmlType: "submit", form: "add-friend-form" }), []);

    return (
        <>
            <Button onClick={showModal} type={"primary"}>
                <AddFriendIcon />
            </Button>
            <Modal
                title="Add a friend!"
                open={isModalOpen}
                onCancel={handleCancel}
                okButtonProps={OK_BUTTON_PROPS}
                centered={true}
            >
                <AddFriendPopupContent
                    form={form}
                    modalError={modalError}
                    setModalError={setModalError}
                    setIsModalOpen={setIsModalOpen}
                />
            </Modal>
        </>
    );
});
