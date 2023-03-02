import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { IFile } from "../model";

export default class FileService {
    static async uploadFile(formData: FormData): Promise<AxiosResponse<IFile[]>> {
        return api.post<IFile[]>("/file/upload-file", formData);
    }
}
