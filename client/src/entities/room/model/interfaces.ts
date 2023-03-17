import { IFriend } from "../../friend";

export interface IRoom {
    roomId: string;
    roomName: string;
    createdBy: string;
    invitedFriends: IFriend[];
}

export interface ICreateRoomValues {
    roomName: string;
}

export interface IInviteFriendToRoomOnFinishValues {
    friendUsername: string;
}

export interface IInviteFriendToJoinRoomData {
    friendUsername: string;
    roomId: string;
    roomName: string;
}
