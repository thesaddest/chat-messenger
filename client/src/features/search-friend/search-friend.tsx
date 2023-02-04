import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Button, Modal } from "antd";

import { IFriend } from "../../entities/friend";
import { SearchIcon } from "../../shared/ui";

import { SearchFriendPopupContent } from "./search-friend-popup-content";

interface ISearchFriend {
    friends: IFriend[];
    friendIdActiveKey: string;
}

export const SearchFriend: FC<ISearchFriend> = ({ friends, friendIdActiveKey }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCancel = useCallback((e: SyntheticEvent) => {
        e.stopPropagation();
        setIsModalOpen(false);
    }, []);

    useEffect(() => {
        setIsModalOpen(false);
    }, [friendIdActiveKey]);

    return (
        <>
            <Button type={"primary"} onClick={showModal}>
                <SearchIcon />
            </Button>
            <Modal title="Search for a friend!" open={isModalOpen} onCancel={handleCancel} centered={true}>
                <SearchFriendPopupContent friends={friends} friendIdActiveKey={friendIdActiveKey} />
            </Modal>
        </>
    );
};
