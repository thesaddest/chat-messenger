import React, { Dispatch, FC, SetStateAction } from "react";
import { List } from "antd";
import styled from "styled-components";

import { IFriend, setFriendIdActiveKey } from "../../../../entities/friend";
import { FriendSidebarCard } from "../../../friend-sidebar-card";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";

interface IFriendPopupItemProps {
    friend: IFriend;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setModalSearchInputValue: Dispatch<SetStateAction<string>>;
}

const StyledListItem = styled(List.Item)`
    cursor: pointer;
`;

export const SearchPopupListItem: FC<IFriendPopupItemProps> = ({
    friend,
    setIsModalOpen,
    setModalSearchInputValue,
}) => {
    const messages = useAppSelector((state) => state.message.messages);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setFriendIdActiveKey(friend.userBehindFriend));
        setIsModalOpen(false);
        setModalSearchInputValue("");
    };

    return (
        messages && (
            <StyledListItem onClick={handleClick}>
                <FriendSidebarCard friend={friend} messages={messages} />
            </StyledListItem>
        )
    );
};
