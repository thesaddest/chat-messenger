import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { Form, FormInstance, List } from "antd";

import { getFriendsBySearchValue, IFriend } from "../../../entities/friend";

import { SearchPopupListItem } from "./search-popup-list-item";
import { SearchFriendInput } from "./search-friend-input/search-friend-input";

interface ISearchFriendPopupContentProps {
    modalSearchInputValue: string;
    setModalSearchInputValue: Dispatch<SetStateAction<string>>;
    friends: IFriend[];
    form: FormInstance;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchFriendPopupContent: FC<ISearchFriendPopupContentProps> = ({
    modalSearchInputValue,
    setModalSearchInputValue,
    friends,
    form,
    setIsModalOpen,
}) => {
    const NO_FRIENDS_FOUND_LOCALE = useMemo(() => ({ emptyText: "No friends found" }), []);
    const friendsBySearchValue = useMemo(
        () => getFriendsBySearchValue(modalSearchInputValue, friends),
        [friends, modalSearchInputValue],
    );

    return (
        <>
            <Form form={form} name="search-friend-form">
                <Form.Item name="search-input">
                    <SearchFriendInput setModalSearchInputValue={setModalSearchInputValue} />
                </Form.Item>
            </Form>
            <List
                locale={NO_FRIENDS_FOUND_LOCALE}
                dataSource={friendsBySearchValue}
                renderItem={(item) => {
                    return (
                        modalSearchInputValue.length > 0 && (
                            <SearchPopupListItem
                                friend={item}
                                form={form}
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
