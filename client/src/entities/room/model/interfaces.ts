import { IFriend } from "../../friend";
import { IUser } from "../../user";

export interface IRoom {
    roomId: string;
    roomName: string;
    createdBy: string;
    invitedFriends: IFriend[];
    participants: IUser[];
}

export interface ICreateRoomValues {
    roomName: string;
}

export interface IInviteFriendToRoomOnFinishValues {
    friendUsername: string;
}

export interface IAcceptInviteToJoinRoom {
    username: string;
    roomId: string;
}
