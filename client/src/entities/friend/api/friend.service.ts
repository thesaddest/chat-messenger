import { AxiosResponse } from "axios";

import { IAddFriendValues, IFriend, IGetFriendsBySearchQuery, IGetMoreFriends } from "../model";
import api from "../../../shared/api/axios-instance";

import { FRIEND_API } from "./api.constants";

export default class FriendService {
    static async getFriends(): Promise<AxiosResponse<IFriend[]>> {
        return api.get<IFriend[]>(`${FRIEND_API.ENTITY}/${FRIEND_API.ALL_FRIENDS}`);
    }

    static async getFriendsWithLimit({ skip }: IGetMoreFriends): Promise<AxiosResponse<IFriend[]>> {
        return api.get<IFriend[]>(`${FRIEND_API.ENTITY}/${FRIEND_API.ALL_FRIENDS}`, { params: { skip } });
    }

    static async addFriend(username: IAddFriendValues): Promise<AxiosResponse<IFriend>> {
        return api.post<IFriend>(`${FRIEND_API.ENTITY}/${FRIEND_API.ADD_FRIEND}`, username);
    }

    static async getFriendsBySearchQuery({ searchQuery }: IGetFriendsBySearchQuery): Promise<AxiosResponse<IFriend[]>> {
        return api.get<IFriend[]>(`${FRIEND_API.ENTITY}/${FRIEND_API.SEARCH}`, { params: { searchQuery } });
    }
}
