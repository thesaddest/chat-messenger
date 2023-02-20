import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { IForwardMessagesPayload, IMessage, IReplyToMessagePayload } from "../model";

export default class MessageService {
    static async getMessages(): Promise<AxiosResponse<IMessage[]>> {
        return api.get<IMessage[]>("/message/getMessages");
    }

    static async sendMessage(messageData: IMessage): Promise<AxiosResponse<IMessage>> {
        return api.post<IMessage>("/message/sendMessage", messageData);
    }

    static async deleteMessages(messageIds: IMessage[]): Promise<AxiosResponse<IMessage[]>> {
        return api.post<IMessage[]>("/message/deleteMessages", messageIds);
    }

    static async readMessages(messages: IMessage[]): Promise<AxiosResponse<IMessage[]>> {
        return api.post<IMessage[]>("/message/readMessages", messages);
    }

    static async forwardMessages(forwardMessagesPayload: IForwardMessagesPayload): Promise<AxiosResponse<IMessage[]>> {
        return api.post<IMessage[]>("/message/forwardMessages", forwardMessagesPayload);
    }

    static async replyToMessage(replyToMessagePayload: IReplyToMessagePayload): Promise<AxiosResponse<IMessage>> {
        return api.post<IMessage>("/message/replyToMessage", replyToMessagePayload);
    }
}
