import { FriendDto } from "./../friend/friend.dto.js";
import { Socket } from "socket.io";
import { Friend } from "../friend/friend.entity.js";
import { friendService } from "./../friend/friend.service.js";
import { userService } from "./../user/user.service.js";

interface IAddFriendCBValues {
    error: string | null;
    friend: FriendDto | null;
}

export type AddFriendCB = ({ error, friend }: IAddFriendCBValues) => void;

export const addFriend = async (username: string, cb: AddFriendCB, socket: Socket): Promise<void | Friend> => {
    const existingUser = await userService.getUserByUsername(username);

    if (!existingUser) {
        return cb({ error: "User doesn't exist", friend: null });
    }

    const currentUser = await userService.getUserByUsername(socket.handshake.auth.username);
    const existingFriend = await friendService.hasFriend(currentUser, username);

    if (existingFriend) {
        return cb({ error: "This user has already been added to your friends list", friend: null });
    }

    if (socket.handshake.auth.username === username) {
        return cb({ error: "You can not add your self", friend: null });
    }

    const newFriend = await friendService.createFriend(username);
    const addedFriend = await friendService.addFriend(newFriend, currentUser);

    return cb({ error: null, friend: addedFriend });
};

export const getFriends = async (socket: Socket): Promise<FriendDto[]> => {
    const user = await userService.getUserByUsername(socket.handshake.auth.username);

    const friends = await friendService.getUserFriends(user);
    socket.emit("friends", friends);

    return friends;
};
