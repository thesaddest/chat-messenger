import { memo, SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button, InputRef, Modal } from "antd";

import { IFriend } from "../../entities/friend";
import { SearchIcon } from "../../shared/ui";

import { SearchFriendPopupContent } from "./search-friend-popup-content";

interface ISearchFriend {
    friends: IFriend[];
    friendIdActiveKey: string;
}

export const SearchFriend = memo<ISearchFriend>(({ friends, friendIdActiveKey }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalSearchInputValue, setModalSearchInputValue] = useState<string>("");
    const modalInputRef = useRef<InputRef>(null);

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCancel = useCallback((e: SyntheticEvent) => {
        e.stopPropagation();
        setIsModalOpen(false);
        setModalSearchInputValue("");
    }, []);

    useEffect(() => {
        setIsModalOpen(false);
        setModalSearchInputValue("");
    }, [friendIdActiveKey]);

    return (
        <>
            <Button type={"primary"} onClick={showModal}>
                <SearchIcon />
            </Button>
            <Modal title="Search for a friend!" open={isModalOpen} onCancel={handleCancel} centered={true}>
                <SearchFriendPopupContent
                    modalInputRef={modalInputRef}
                    friends={friends}
                    modalSearchInputValue={modalSearchInputValue}
                    setModalSearchInputValue={setModalSearchInputValue}
                />
            </Modal>
        </>
    );
});
