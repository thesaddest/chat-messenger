import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { ILoginValues } from "../../../pages/login/interfaces";
import { IRegisterValues } from "../../../pages/register/interfaces";
import { IUser } from "../model";

export default class UserService {
    static async login(userData: ILoginValues): Promise<AxiosResponse<IUser>> {
        return api.post<IUser>("/auth/login", userData);
    }

    static async register(userData: IRegisterValues): Promise<AxiosResponse<IUser>> {
        return api.post<IUser>("/auth/register", userData);
    }
}
