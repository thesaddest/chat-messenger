import React, { Dispatch, FC, SetStateAction } from "react";
import { List } from "antd";
import styled from "styled-components";

import { IFriend, setFriendIdActiveKey } from "../../../../entities/friend";
import { FriendSidebarCard } from "../../../friend-sidebar-card";
import { useAppDispatch } from "../../../../shared/lib/hooks";
import { IMessage } from "../../../../entities/message";

interface IFriendPopupItemProps {
    item: IFriend;
    messages: IMessage[];
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setModalSearchInputValue: Dispatch<SetStateAction<string>>;
}

const StyledListItem = styled(List.Item)`
    cursor: pointer;
`;

export const SearchPopupListItem: FC<IFriendPopupItemProps> = ({
    item,
    messages,
    setIsModalOpen,
    setModalSearchInputValue,
}) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setFriendIdActiveKey(item.userBehindFriend));
        setIsModalOpen(false);
        setModalSearchInputValue("");
    };

    return (
        <StyledListItem onClick={handleClick}>
            <FriendSidebarCard friend={item} messages={messages} />
        </StyledListItem>
    );
};
