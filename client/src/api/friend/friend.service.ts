import { AxiosResponse } from "axios";

import { IFriend } from "../interfaces";
import api from "../http";

export default class FriendService {
    static async getFriends(): Promise<AxiosResponse<IFriend[]>> {
        return api.get<IFriend[]>("/friend/getFriends");
    }
}