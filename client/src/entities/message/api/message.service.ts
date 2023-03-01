import { AxiosResponse } from "axios";

import api from "../../../shared/api/axios-instance";
import { IForwardMessagesPayload, IMessage, IReplyToMessagePayload, ISendMessageWithFilesPayload } from "../model";

export default class MessageService {
    static async getMessages(): Promise<AxiosResponse<IMessage[]>> {
        return api.get<IMessage[]>("/message/messages");
    }

    static async sendMessage(messageData: IMessage): Promise<AxiosResponse<IMessage>> {
        return api.post<IMessage>("/message/message", messageData);
    }

    static async deleteMessages(messageIds: IMessage[]): Promise<AxiosResponse<IMessage[]>> {
        return api.post<IMessage[]>("/message/delete", messageIds);
    }

    static async readMessages(messages: IMessage[]): Promise<AxiosResponse<IMessage[]>> {
        return api.post<IMessage[]>("/message/read", messages);
    }

    static async forwardMessages(forwardMessagesPayload: IForwardMessagesPayload): Promise<AxiosResponse<IMessage[]>> {
        return api.post<IMessage[]>("/message/forward", forwardMessagesPayload);
    }

    static async replyToMessage(replyToMessagePayload: IReplyToMessagePayload): Promise<AxiosResponse<IMessage>> {
        return api.post<IMessage>("/message/reply", replyToMessagePayload);
    }

    static async uploadFileMessage(formData: ISendMessageWithFilesPayload): Promise<AxiosResponse<IMessage>> {
        return await api.post<IMessage>("/file/upload-file", formData);
    }
}
