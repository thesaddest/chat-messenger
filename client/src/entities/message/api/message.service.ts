import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { IForwardMessagesPayload, IMessage, IReplyToMessagePayload } from "../model";

import { MESSAGE_API } from "./api.constants";

export default class MessageService {
    static async getMessages(): Promise<AxiosResponse<IMessage[]>> {
        return api.get<IMessage[]>(`${MESSAGE_API.ENTITY}/${MESSAGE_API.ALL_MESSAGES}`);
    }

    static async sendMessage(messageData: IMessage): Promise<AxiosResponse<IMessage>> {
        return api.post<IMessage>(`${MESSAGE_API.ENTITY}/${MESSAGE_API.SEND_MESSAGE}`, messageData);
    }

    static async deleteMessages(messageIds: IMessage[]): Promise<AxiosResponse<IMessage[]>> {
        return api.delete<IMessage[]>(`${MESSAGE_API.ENTITY}/${MESSAGE_API.DELETE_MESSAGES}`, { data: messageIds });
    }

    static async readMessages(messages: IMessage[]): Promise<AxiosResponse<IMessage[]>> {
        return api.post<IMessage[]>(`${MESSAGE_API.ENTITY}/${MESSAGE_API.READ_MESSAGES}`, messages);
    }

    static async forwardMessages(forwardMessagesPayload: IForwardMessagesPayload): Promise<AxiosResponse<IMessage[]>> {
        return api.post<IMessage[]>(`${MESSAGE_API.ENTITY}/${MESSAGE_API.FORWARD_MESSAGES}`, forwardMessagesPayload);
    }

    static async replyToMessage(replyToMessagePayload: IReplyToMessagePayload): Promise<AxiosResponse<IMessage>> {
        return api.post<IMessage>(`${MESSAGE_API.ENTITY}/${MESSAGE_API.REPLY_TO_MESSAGE}`, replyToMessagePayload);
    }
}
