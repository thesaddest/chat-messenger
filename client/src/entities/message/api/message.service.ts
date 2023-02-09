import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { IDeleteMessageData, IMessage } from "../model";

export default class MessageService {
    static async getMessages(): Promise<AxiosResponse<IMessage[]>> {
        return api.get<IMessage[]>("/message/getMessages");
    }

    static async sendMessage(messageData: IMessage): Promise<AxiosResponse<IMessage>> {
        return api.post<IMessage>("/message/sendMessage", messageData);
    }

    static async deleteMessages(messageIds: IDeleteMessageData): Promise<AxiosResponse<IMessage[]>> {
        return api.post<IMessage[]>("/message/deleteMessages", messageIds);
    }
}
