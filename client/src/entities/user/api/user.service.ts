import { AxiosRequestConfig, AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { ILoginValues } from "../../../pages/login/interfaces";
import { IRegisterValues } from "../../../pages/register/interfaces";
import { IUser } from "../model";

import { USER_API } from "./api.constants";

export default class UserService {
    static async login(userData: ILoginValues): Promise<AxiosResponse<IUser>> {
        return api.post<IUser>(`${USER_API.AUTH_ENTITY}/${USER_API.LOGIN}`, userData);
    }

    static async register(userData: IRegisterValues): Promise<AxiosResponse<IUser>> {
        return api.post<IUser>(`${USER_API.AUTH_ENTITY}/${USER_API.REGISTER}`, userData);
    }

    static async changeAvatar(formData: FormData, filepath: string): Promise<AxiosResponse<IUser>> {
        //modify req.headers to pass the username to multer middleware, so we can have <usernameFolder>/<file> in our s3 bucket
        api.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
            if (config.headers) {
                config.headers.filepath = filepath;
            }

            return config;
        });
        return api.post<IUser>(`${USER_API.USER_ENTITY}/${USER_API.CHANGE_AVATAR}`, formData);
    }
}
