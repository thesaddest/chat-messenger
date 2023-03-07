import { AxiosResponse } from "axios";
import { AxiosRequestConfig } from "axios";
import { UploadFile } from "antd/es/upload/interface";

import api from "../../../shared/api/axios-instance";
import { IFile } from "../model";

export default class FileService {
    static async uploadFile(formData: FormData, username: string): Promise<AxiosResponse<IFile>> {
        //modify req.headers to pass the username to multer middleware, so we can have <usernameFolder>/<file> in our s3 bucket
        api.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
            if (config.headers) {
                config.headers.username = username;
            }

            return config;
        });
        return api.post<IFile>("/file/upload-single-file", formData);
    }

    static async deleteSingleFile(file: UploadFile): Promise<AxiosResponse<IFile>> {
        return api.post<IFile>("/file/delete-single-file", file);
    }
}
