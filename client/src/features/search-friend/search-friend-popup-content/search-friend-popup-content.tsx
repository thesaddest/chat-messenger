import { ChangeEvent, Dispatch, FC, RefObject, SetStateAction, useEffect, useMemo } from "react";
import { Input, InputRef, List } from "antd";

import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { getAllRemainingFriends, getFriendsBySearchValue, IFriend } from "../../../entities/friend";
import { SearchIcon } from "../../../shared/ui";

import { SearchPopupListItem } from "./search-popup-list-item";

interface ISearchFriendPopupContentProps {
    friends: IFriend[];
    modalSearchInputValue: string;
    setModalSearchInputValue: Dispatch<SetStateAction<string>>;
    modalInputRef: RefObject<InputRef>;
}

export const SearchFriendPopupContent: FC<ISearchFriendPopupContentProps> = ({
    friends,
    modalSearchInputValue,
    setModalSearchInputValue,
    modalInputRef,
}) => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector((state) => state.message.messages);

    const NO_FRIENDS_FOUND_LOCALE = useMemo(() => ({ emptyText: "No friends found" }), []);

    const friendsBySearchValue = useMemo(
        () => getFriendsBySearchValue(modalSearchInputValue, friends),
        [friends, modalSearchInputValue],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setModalSearchInputValue(e.target.value);
    };

    useEffect(() => {
        dispatch(getAllRemainingFriends({ skip: friends.length }));
    }, []);

    useEffect(() => {
        if (modalInputRef.current) {
            modalInputRef.current.focus();
        }
    });

    return (
        <>
            <Input
                prefix={<SearchIcon />}
                placeholder="Enter friend's username"
                onChange={handleChange}
                ref={modalInputRef}
                value={modalSearchInputValue}
            />
            <List
                locale={NO_FRIENDS_FOUND_LOCALE}
                dataSource={friendsBySearchValue}
                renderItem={(item) => {
                    return (
                        messages &&
                        modalSearchInputValue.length > 0 && <SearchPopupListItem item={item} messages={messages} />
                    );
                }}
            />
        </>
    );
};
