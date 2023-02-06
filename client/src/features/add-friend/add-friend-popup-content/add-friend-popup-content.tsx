import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { Form, FormInstance, Input } from "antd";

import { addFriend, IAddFriendValues } from "../../../entities/friend";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { AUTH_RULES } from "../../../shared/const";
import { ErrorAlert, AddFriend } from "../../../shared/ui";

import type { InputRef } from "antd";

interface IAddFriendPopupContentProps {
    form: FormInstance;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setModalError: Dispatch<SetStateAction<string>>;
    modalError: string;
}

export const AddFriendPopupContent: FC<IAddFriendPopupContentProps> = ({
    form,
    setIsModalOpen,
    setModalError,
    modalError,
}) => {
    const inputRef = useRef<InputRef>(null);
    const dispatch = useAppDispatch();

    const onFinish = async ({ username }: IAddFriendValues) => {
        const { payload } = await dispatch(addFriend({ username: username }));

        if (typeof payload === "string") {
            return setModalError(payload);
        }

        setIsModalOpen(false);
        form.resetFields();
    };

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    });

    return (
        <Form form={form} name="add-friend-form" onFinish={onFinish}>
            <Form.Item name="username" rules={AUTH_RULES.USERNAME}>
                <Input ref={inputRef} prefix={<AddFriend />} placeholder="Enter friend's username" />
            </Form.Item>
            {modalError && <ErrorAlert type="error" message={modalError} />}
        </Form>
    );
};
