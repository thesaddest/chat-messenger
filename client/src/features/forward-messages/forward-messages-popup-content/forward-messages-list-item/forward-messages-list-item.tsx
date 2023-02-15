import { FormInstance, List } from "antd";
import { Dispatch, memo, SetStateAction, useCallback } from "react";
import styled from "styled-components";

import { IFriend, setFriendIdActiveKey } from "../../../../entities/friend";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";
import { FriendSidebarCard } from "../../../friend-sidebar-card";
import { deselectAllSelectedMessages, forwardMessages } from "../../../../entities/message";

interface IForwardMessagesListItemProps {
    friend: IFriend;
    form: FormInstance;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setModalSearchInputValue: Dispatch<SetStateAction<string>>;
}

const StyledListItem = styled(List.Item)`
    cursor: pointer;
`;

export const ForwardMessagesListItem = memo<IForwardMessagesListItemProps>(
    ({ friend, setIsModalOpen, form, setModalSearchInputValue }) => {
        const messages = useAppSelector((state) => state.message.messages);
        const selectedMessages = useAppSelector((state) => state.message.selectedMessages);
        const dispatch = useAppDispatch();

        const handleClick = useCallback(() => {
            dispatch(forwardMessages({ messages: selectedMessages, to: friend.userBehindFriend }));
            dispatch(deselectAllSelectedMessages(selectedMessages));
            dispatch(setFriendIdActiveKey(friend.userBehindFriend));
            setIsModalOpen(false);
            setModalSearchInputValue("");
            form.resetFields();
        }, [dispatch, friend.userBehindFriend, selectedMessages, setIsModalOpen, setModalSearchInputValue, form]);

        return (
            messages && (
                <StyledListItem onClick={handleClick}>
                    <FriendSidebarCard friend={friend} messages={messages} />
                </StyledListItem>
            )
        );
    },
);
