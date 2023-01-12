import { Message } from "./message.entity.js";
import { AppDataSource } from "../db/database.js";
import { MessageDto } from "./message.dto.js";

class MessageService {
    async createMessage(messageDto: MessageDto): Promise<Message> {
        const messageRepository = AppDataSource.getRepository(Message);
        const message = messageRepository.create(messageDto);
        await messageRepository.save(message);

        return message;
    }
}

export const messageService = new MessageService();
