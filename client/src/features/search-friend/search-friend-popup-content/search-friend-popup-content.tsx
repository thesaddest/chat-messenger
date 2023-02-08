import { Dispatch, memo, SetStateAction, useMemo } from "react";
import { Form, FormInstance, List } from "antd";

import { getFriendsBySearchValue, IFriend } from "../../../entities/friend";

import { SearchPopupListItem } from "./search-popup-list-item";
import { ModalSearchInput } from "./modal-search-input";

interface ISearchFriendPopupContentProps {
    modalSearchInputValue: string;
    setModalSearchInputValue: Dispatch<SetStateAction<string>>;
    friends: IFriend[];
    form: FormInstance;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchFriendPopupContent = memo<ISearchFriendPopupContentProps>(
    ({ modalSearchInputValue, setModalSearchInputValue, friends, form, setIsModalOpen }) => {
        const NO_FRIENDS_FOUND_LOCALE = useMemo(() => ({ emptyText: "No friends found" }), []);
        const friendsBySearchValue = useMemo(
            () => getFriendsBySearchValue(modalSearchInputValue, friends),
            [friends, modalSearchInputValue],
        );

        return (
            <>
                <Form form={form} name="search-friend-form">
                    <Form.Item name="username">
                        <ModalSearchInput value={modalSearchInputValue} onChange={setModalSearchInputValue} />
                    </Form.Item>
                </Form>

                <List
                    locale={NO_FRIENDS_FOUND_LOCALE}
                    dataSource={friendsBySearchValue}
                    renderItem={(item) => {
                        return (
                            modalSearchInputValue.length > 0 && (
                                <SearchPopupListItem friend={item} setIsModalOpen={setIsModalOpen} />
                            )
                        );
                    }}
                />
            </>
        );
    },
);
