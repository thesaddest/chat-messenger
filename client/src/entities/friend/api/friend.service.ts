import { AxiosResponse } from "axios";

import { IAddFriendValues, IFriend, IGetFriendsBySearchQuery, IGetMoreFriends } from "../model";
import api from "../../../shared/api/axios-instance";

export default class FriendService {
    static async getFriends(): Promise<AxiosResponse<IFriend[]>> {
        return api.get<IFriend[]>("/friend/getFriends");
    }

    static async getMoreFriends({ skip }: IGetMoreFriends): Promise<AxiosResponse<IFriend[]>> {
        return api.get<IFriend[]>("/friend/getFriends", { params: { skip } });
    }

    static async addFriend(username: IAddFriendValues): Promise<AxiosResponse<IFriend>> {
        return api.post<IFriend>("/friend/addFriend", username);
    }

    static async getFriendsBySearchQuery({ searchQuery }: IGetFriendsBySearchQuery): Promise<AxiosResponse<IFriend[]>> {
        return api.get<IFriend[]>("/friend/getFriendsBySearchQuery", { params: { searchQuery } });
    }
}
