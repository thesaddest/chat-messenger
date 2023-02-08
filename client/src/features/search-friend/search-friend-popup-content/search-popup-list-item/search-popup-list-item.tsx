import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";
import { List } from "antd";
import styled from "styled-components";

import { IFriend, setFriendIdActiveKey } from "../../../../entities/friend";
import { FriendSidebarCard } from "../../../friend-sidebar-card";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";

interface IFriendPopupItemProps {
    friend: IFriend;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const StyledListItem = styled(List.Item)`
    cursor: pointer;
`;

export const SearchPopupListItem = memo<IFriendPopupItemProps>(({ friend, setIsModalOpen }) => {
    const messages = useAppSelector((state) => state.message.messages);
    const dispatch = useAppDispatch();

    const handleClick = useCallback(() => {
        dispatch(setFriendIdActiveKey(friend.userBehindFriend));
        setIsModalOpen(false);
    }, [dispatch, friend.userBehindFriend, setIsModalOpen]);

    return (
        messages && (
            <StyledListItem onClick={handleClick}>
                <FriendSidebarCard friend={friend} messages={messages} />
            </StyledListItem>
        )
    );
});
