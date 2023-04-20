import { AxiosResponse } from "axios";
import { AxiosRequestConfig } from "axios";

import api from "../../../shared/api/axios-instance";
import { IFile } from "../model";

import { FILE_API } from "./api.constants";

export default class FileService {
    static async uploadFile(
        formData: FormData,
        filepath: string,
        friendIdActiveKey: string,
    ): Promise<AxiosResponse<IFile>> {
        //modify req.headers to pass the username to multer middleware, so we can have <usernameFolder>/<file> in our s3 bucket
        api.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
            if (config.headers) {
                config.headers.filepath = filepath;
                config.headers.sentto = friendIdActiveKey;
            }

            return config;
        });
        return api.post<IFile>(`${FILE_API.ENTITY}/${FILE_API.UPLOAD_SINGLE_FILE}`, formData);
    }
}
