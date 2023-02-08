import { ChangeEvent, FC, useEffect, useRef } from "react";
import { Input, InputRef } from "antd";

import { Search } from "../../../../shared/ui";
import { useAppDispatch, useDebounce } from "../../../../shared/lib/hooks";
import { getFriendsBySearchQuery } from "../../../../entities/friend";

interface IModalSearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const ModalSearchInput: FC<IModalSearchInputProps> = ({ value, onChange }) => {
    const inputRef = useRef<InputRef>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    });

    const handleChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        dispatch(getFriendsBySearchQuery({ searchQuery: e.target.value }));
    }, 1000);

    return <Input ref={inputRef} prefix={<Search />} placeholder="Enter friend's username" onChange={handleChange} />;
};
