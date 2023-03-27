import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { ILoginValues } from "../../../pages/login/interfaces";
import { IRegisterValues } from "../../../pages/register/interfaces";
import { IUser } from "../model";

import { USER_API } from "./api.constants";

export default class UserService {
    static async login(userData: ILoginValues): Promise<AxiosResponse<IUser>> {
        return api.post<IUser>(`${USER_API.ENTITY}/${USER_API.LOGIN}`, userData);
    }

    static async register(userData: IRegisterValues): Promise<AxiosResponse<IUser>> {
        return api.post<IUser>(`${USER_API.ENTITY}/${USER_API.REGISTER}`, userData);
    }
}
