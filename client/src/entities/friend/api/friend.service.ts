import { AxiosResponse } from "axios";

import { IFriend } from "../model";
import api from "../../../shared/api/axios-instance";

export default class FriendService {
    static async getFriends(): Promise<AxiosResponse<IFriend[]>> {
        return api.get<IFriend[]>("/friend/getFriends");
    }
}