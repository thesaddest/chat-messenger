import { memo, SyntheticEvent, useCallback, useState } from "react";
import { Form, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useAppSelector } from "../../shared/lib/hooks";

import { MenuButton } from "../../shared/ui";

import { SearchFriendPopupContent } from "./search-friend-popup-content";

export const SearchFriend = memo(() => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalSearchInputValue, setModalSearchInputValue] = useState<string>("");

    const friends = useAppSelector((state) => state.friend.friends);

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCancel = useCallback(
        (e: SyntheticEvent) => {
            e.stopPropagation();
            setIsModalOpen(false);
            setModalSearchInputValue("");
            form.resetFields();
        },
        [form],
    );

    return (
        friends && (
            <>
                <MenuButton type="primary" onClick={showModal}>
                    <SearchOutlined /> Search
                </MenuButton>
                <Modal
                    title="Search for a chat!"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    centered={true}
                    footer={null}
                >
                    <SearchFriendPopupContent
                        modalSearchInputValue={modalSearchInputValue}
                        setModalSearchInputValue={setModalSearchInputValue}
                        friends={friends}
                        form={form}
                        setIsModalOpen={setIsModalOpen}
                    />
                </Modal>
            </>
        )
    );
});
