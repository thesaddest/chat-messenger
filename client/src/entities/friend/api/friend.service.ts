import { AxiosResponse } from "axios";

import { IFriend } from "../model/interfaces";
import api from "../../../shared/api/axiosInstance";

export default class FriendService {
    static async getFriends(): Promise<AxiosResponse<IFriend[]>> {
        return api.get<IFriend[]>("/friend/getFriends");
    }
}