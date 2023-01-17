import { AxiosResponse } from "axios";

import { ILoginValues, IRegisterValues } from "../../components/Auth/interfaces";
import api from "../http";
import { IUser } from "../interfaces";

export default class AuthService {
    static async login(userData: ILoginValues): Promise<AxiosResponse<IUser>> {
        return api.post<IUser>("/auth/login", userData);
    }

    static async register(userData: IRegisterValues): Promise<AxiosResponse<IUser>> {
        return api.post<IUser>("/auth/register", userData);
    }
}
