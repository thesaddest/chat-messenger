import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { FormInstance, List } from "antd";
import styled from "styled-components";

import { IFriend, setFriendIdActiveKey } from "../../../../entities/friend";
import { FriendSidebarCard } from "../../../friend-sidebar-card";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";

interface IFriendPopupItemProps {
    friend: IFriend;
    form: FormInstance;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setModalSearchInputValue: Dispatch<SetStateAction<string>>;
}

const StyledListItem = styled(List.Item)`
    cursor: pointer;
`;

export const SearchPopupListItem = memo<IFriendPopupItemProps>(
    ({ friend, setIsModalOpen, form, setModalSearchInputValue }) => {
        const messages = useAppSelector((state) => state.message.messages);
        const dispatch = useAppDispatch();

        const handleClick = useCallback(() => {
            dispatch(setFriendIdActiveKey(friend.userBehindFriend));
            setIsModalOpen(false);
            setModalSearchInputValue("");
            form.resetFields();
        }, [dispatch, friend.userBehindFriend, setIsModalOpen, form, setModalSearchInputValue]);

        return (
            messages && (
                <StyledListItem onClick={handleClick}>
                    <FriendSidebarCard friend={friend} messages={messages} />
                </StyledListItem>
            )
        );
    },
);
