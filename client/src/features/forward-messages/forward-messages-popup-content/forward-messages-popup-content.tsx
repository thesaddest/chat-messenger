import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { Form, FormInstance, List } from "antd";

import { getFriendsBySearchValue, IFriend } from "../../../entities/friend";
import { SearchFriendInput } from "../../../shared/ui";

import { ForwardMessagesListItem } from "./forward-messages-list-item";

interface IForwardMessagesPopupContentProps {
    modalSearchInputValue: string;
    friends: IFriend[];
    setModalSearchInputValue: Dispatch<SetStateAction<string>>;
    form: FormInstance;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ForwardMessagesPopupContent: FC<IForwardMessagesPopupContentProps> = ({
    form,
    friends,
    setIsModalOpen,
    setModalSearchInputValue,
    modalSearchInputValue,
}) => {
    const NO_FRIENDS_FOUND_LOCALE = useMemo(() => ({ emptyText: "No friends found" }), []);
    const friendsBySearchValue = useMemo(
        () => getFriendsBySearchValue(modalSearchInputValue, friends),
        [friends, modalSearchInputValue],
    );
    return (
        <>
            <Form form={form} name="forward-messages-form">
                <Form.Item name="forward-messages-input">
                    <SearchFriendInput setModalSearchInputValue={setModalSearchInputValue} />
                </Form.Item>
            </Form>
            <List
                locale={NO_FRIENDS_FOUND_LOCALE}
                dataSource={friendsBySearchValue}
                renderItem={(item) => {
                    return (
                        modalSearchInputValue.length > 0 && (
                            <ForwardMessagesListItem
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
