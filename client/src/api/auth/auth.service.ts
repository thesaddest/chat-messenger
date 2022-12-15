import { AxiosResponse } from "axios";

import { IAuthValues } from "../../components/Auth/interfaces";
import api from "../http";
import { IUser } from "../interfaces";

export default class AuthService {
    static async login(userData: IAuthValues): Promise<AxiosResponse<IUser>> {
        return api.post<IUser>("/login", userData);
    }

    static async register(userData: IAuthValues): Promise<AxiosResponse<IUser>> {
        return api.post<IUser>("/register", userData);
    }
}
