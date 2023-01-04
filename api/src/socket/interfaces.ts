import { FriendDto } from "../friend/friend.dto.js";

export interface IAddFriendCBValues {
    error: string | null;
    friend: FriendDto | null;
}

export type AddFriendCB = ({ error, friend }: IAddFriendCBValues) => void;
