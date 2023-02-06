import { ChangeEvent, Dispatch, FC, RefObject, SetStateAction, useCallback, useEffect, useMemo } from "react";
import { Input, InputRef, List } from "antd";

import { useAppDispatch, useDebounce } from "../../../shared/lib/hooks";
import { getAllRemainingFriends, getFriendsBySearchValue, IFriend } from "../../../entities/friend";
import { Search } from "../../../shared/ui";

import { SearchPopupListItem } from "./search-popup-list-item";

interface ISearchFriendPopupContentProps {
    friends: IFriend[];
    modalSearchInputValue: string;
    setModalSearchInputValue: Dispatch<SetStateAction<string>>;
    modalInputRef: RefObject<InputRef>;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchFriendPopupContent: FC<ISearchFriendPopupContentProps> = ({
    friends,
    modalSearchInputValue,
    setModalSearchInputValue,
    modalInputRef,
    setIsModalOpen,
}) => {
    const dispatch = useAppDispatch();
    const NO_FRIENDS_FOUND_LOCALE = useMemo(() => ({ emptyText: "No friends found" }), []);
    const friendsBySearchValue = useMemo(
        () => getFriendsBySearchValue(modalSearchInputValue, friends),
        [friends, modalSearchInputValue],
    );

    const debouncedChangeHandler = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
        setModalSearchInputValue(e.target.value);
        dispatch(getAllRemainingFriends({ skip: friends.length }));
    }, 300);

    useEffect(() => {
        if (modalInputRef.current) {
            modalInputRef.current.focus();
        }
    });

    return (
        <>
            <Input
                prefix={<Search />}
                placeholder="Enter friend's username"
                onChange={debouncedChangeHandler}
                ref={modalInputRef}
            />
            <List
                locale={NO_FRIENDS_FOUND_LOCALE}
                dataSource={friendsBySearchValue}
                renderItem={(item) => {
                    return (
                        modalSearchInputValue.length > 0 && (
                            <SearchPopupListItem
                                friend={item}
                                setIsModalOpen={setIsModalOpen}
                                setModalSearchInputValue={setModalSearchInputValue}
                            />
                        )
                    );
                }}
            />
        </>
    );
};
