import { socketService } from "./socket.service.js";
import { AddFriendCB } from "./interfaces.js";
import { FriendDto } from "../friend/friend.dto.js";
import { Server, Socket } from "socket.io";
import { Friend } from "../friend/friend.entity.js";
import { friendService } from "../friend/friend.service.js";
import { userService } from "../user/user.service.js";
import { SOCKET_EVENTS } from "./socket.constants.js";

export const addFriend = async (username: string, cb: AddFriendCB, socket: Socket): Promise<void | Friend> => {
    const existingUser = await userService.getUserByUsername(username);

    if (!existingUser) {
        return cb({ error: "User doesn't exist", friend: null });
    }

    const currentUser = await socketService.getCurrentUser(socket);
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

// export const getCurrentUserFriends = async (socket: Socket): Promise<FriendDto[]> => {
//     const user = await socketService.getCurrentUser(socket);

//     if (user) {
//         const friends = await friendService.getUserFriends(user);

//         socket.emit(SOCKET_EVENTS.GET_ALL_FRIENDS, friends);

//         return friends;
//     }
// };

export const getCurrentUserFriends = async (socket: Socket, io: Server): Promise<FriendDto[]> => {
    const user = await socketService.getCurrentUser(socket);

    if (user) {
        const allUserFriends = await friendService.getUserFriends(user);
        const allConnectedUsers = await socketService.getAllConnectedUsers(io);
        const connectedFriends = await socketService.getConnectedFriends(socket, allConnectedUsers);

        socket.emit(SOCKET_EVENTS.GET_ALL_FRIENDS, allUserFriends);
        return allUserFriends;
    }
};

export const getConnectedFriends = async (io: Server, socket: Socket) => {
    const connectedUsers = await socketService.getAllConnectedUsers(io);
    const connectedFriends = await socketService.getConnectedFriends(socket, connectedUsers);
    socket.emit(SOCKET_EVENTS.GET_CONNECTED_FRIENDS, connectedFriends);

    return connectedFriends;
};
