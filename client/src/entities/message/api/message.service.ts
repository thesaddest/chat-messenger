import { AxiosResponse } from "axios";

import api from "../../../shared/api/axiosInstance";
import { IMessage } from "../model/interfaces";

export default class MessageService {
    static async getMessages(): Promise<AxiosResponse<IMessage[]>> {
        return api.get<IMessage[]>("/message/getMessages");
    }

    static async sendMessage(messageData: IMessage): Promise<AxiosResponse<IMessage>> {
        return api.post<IMessage>("/message/sendMessage", messageData);
    }
}