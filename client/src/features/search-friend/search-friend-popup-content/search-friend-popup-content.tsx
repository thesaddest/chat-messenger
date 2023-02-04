import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Input, InputRef, List } from "antd";

import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { getFriendsBySearchValue, getMoreFriends, IFriend, setFriendIdActiveKey } from "../../../entities/friend";
import { FriendSidebarCard } from "../../friend-sidebar-card";
import { SearchIcon } from "../../../shared/ui";

interface ISearchFriendPopupContentProps {
    friends: IFriend[];
    friendIdActiveKey: string;
}

export const SearchFriendPopupContent: FC<ISearchFriendPopupContentProps> = ({ friends, friendIdActiveKey }) => {
    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const inputRef = useRef<InputRef>(null);

    const dispatch = useAppDispatch();
    const messages = useAppSelector((state) => state.message.messages);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
    };

    useEffect(() => {
        dispatch(getMoreFriends({ skip: friends.length }));
    }, [dispatch, friends.length]);

    useEffect(() => {
        setSearchInputValue("");
    }, [friendIdActiveKey]);

    useEffect(() => {
        inputRef.current?.focus();
    });

    return (
        <>
            <Input
                prefix={<SearchIcon />}
                placeholder="Enter friend's username"
                onChange={handleChange}
                ref={inputRef}
                value={searchInputValue}
            />
            <List
                dataSource={getFriendsBySearchValue(searchInputValue, friends)}
                renderItem={(item) => {
                    return (
                        messages &&
                        searchInputValue.length > 0 && (
                            <List.Item onClick={() => dispatch(setFriendIdActiveKey(item.userBehindFriend))}>
                                <FriendSidebarCard friend={item} messages={messages} />
                            </List.Item>
                        )
                    );
                }}
            />
        </>
    );
};
