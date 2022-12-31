import { FriendDto } from "../friend/friend.dto.js";

export interface ConnectedUser {
    socketId: string;
    userId: number;
    username: string;
    connected: boolean;
}

export interface IAddFriendCBValues {
    error: string | null;
    friend: FriendDto | null;
}

export type AddFriendCB = ({ error, friend }: IAddFriendCBValues) => void;
