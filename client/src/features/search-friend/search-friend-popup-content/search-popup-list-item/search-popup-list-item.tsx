import React, { FC } from "react";
import { List } from "antd";
import styled from "styled-components";

import { IFriend, setFriendIdActiveKey } from "../../../../entities/friend";
import { FriendSidebarCard } from "../../../friend-sidebar-card";
import { useAppDispatch } from "../../../../shared/lib/hooks";
import { IMessage } from "../../../../entities/message";

interface IFriendPopupItemProps {
    item: IFriend;
    messages: IMessage[];
}

const StyledListItem = styled(List.Item)`
    cursor: pointer;
`;

export const SearchPopupListItem: FC<IFriendPopupItemProps> = ({ item, messages }) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setFriendIdActiveKey(item.userBehindFriend));
    };

    return (
        <StyledListItem onClick={handleClick}>
            <FriendSidebarCard friend={item} messages={messages} />
        </StyledListItem>
    );
};
