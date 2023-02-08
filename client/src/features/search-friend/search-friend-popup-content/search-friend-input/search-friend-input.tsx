import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

import { Input, InputRef } from "antd";

import { Search } from "../../../../shared/ui";
import { useAppDispatch, useDebounce } from "../../../../shared/lib/hooks";
import { getFriendsBySearchQuery } from "../../../../entities/friend";

interface ISearchFriendInputProps {
    setModalSearchInputValue: Dispatch<SetStateAction<string>>;
}

export const SearchFriendInput: FC<ISearchFriendInputProps> = ({ setModalSearchInputValue }) => {
    const inputRef = useRef<InputRef>(null);
    const dispatch = useAppDispatch();

    const handleChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
        setModalSearchInputValue(e.target.value);
        dispatch(getFriendsBySearchQuery({ searchQuery: e.target.value }));
    }, 1000);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    });

    return <Input ref={inputRef} prefix={<Search />} placeholder="Enter friend's username" onChange={handleChange} />;
};
