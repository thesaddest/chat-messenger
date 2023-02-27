import { AxiosResponse } from "axios";

import { IAddFriendValues, IFriend, IGetFriendsBySearchQuery, IGetMoreFriends } from "../model";
import api from "../../../shared/api/axios-instance";

export default class FriendService {
    static async getFriends(): Promise<AxiosResponse<IFriend[]>> {
        return api.get<IFriend[]>("/friend/friends");
    }

    static async getFriendsWithLimit({ skip }: IGetMoreFriends): Promise<AxiosResponse<IFriend[]>> {
        return api.get<IFriend[]>("/friend/friends", { params: { skip } });
    }

    static async addFriend(username: IAddFriendValues): Promise<AxiosResponse<IFriend>> {
        return api.post<IFriend>("/friend/friend", username);
    }

    static async getFriendsBySearchQuery({ searchQuery }: IGetFriendsBySearchQuery): Promise<AxiosResponse<IFriend[]>> {
        return api.get<IFriend[]>("/friend/search", { params: { searchQuery } });
    }
}
