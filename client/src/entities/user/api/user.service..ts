import { AxiosResponse } from "axios";

import api from "../../../shared/api/axiosInstance";
import { IUser } from "../../friend/model/interfaces";
import { ILoginValues } from "../../../pages/login/interfaces";
import { IRegisterValues } from "../../../pages/register/interfaces";

export default class UserService {
    static async login(userData: ILoginValues): Promise<AxiosResponse<IUser>> {
        return api.post<IUser>("/auth/login", userData);
    }

    static async register(userData: IRegisterValues): Promise<AxiosResponse<IUser>> {
        return api.post<IUser>("/auth/register", userData);
    }
}
