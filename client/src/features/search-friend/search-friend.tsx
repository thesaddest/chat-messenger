import { memo, SyntheticEvent, useCallback, useRef, useState } from "react";
import { Button, InputRef, Modal } from "antd";

import { Search } from "../../shared/ui";
import { useAppSelector } from "../../shared/lib/hooks";

import { SearchFriendPopupContent } from "./search-friend-popup-content";

export const SearchFriend = memo(() => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalSearchInputValue, setModalSearchInputValue] = useState<string>("");
    const modalInputRef = useRef<InputRef>(null);

    const friends = useAppSelector((state) => state.friend.friends);

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCancel = useCallback((e: SyntheticEvent) => {
        e.stopPropagation();
        setIsModalOpen(false);
        setModalSearchInputValue("");
    }, []);

    return (
        friends && (
            <>
                <Button type={"primary"} onClick={showModal}>
                    <Search />
                </Button>
                <Modal title="Search for a friend!" open={isModalOpen} onCancel={handleCancel} centered={true}>
                    <SearchFriendPopupContent
                        friends={friends}
                        modalInputRef={modalInputRef}
                        modalSearchInputValue={modalSearchInputValue}
                        setModalSearchInputValue={setModalSearchInputValue}
                        setIsModalOpen={setIsModalOpen}
                    />
                </Modal>
            </>
        )
    );
});
