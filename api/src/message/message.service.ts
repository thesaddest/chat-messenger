import { Message } from "./message.entity.js";
import { AppDataSource } from "../db/database.js";
import { MessageDto } from "./message.dto.js";
import { User } from "../user/user.entity.js";

class MessageService {
    async createMessage(messageDto: MessageDto): Promise<Message> {
        const messageRepository = AppDataSource.getRepository(Message);
        const message = messageRepository.create(messageDto);
        await messageRepository.save(message);

        return message;
    }

    async getUserMessages(user: User): Promise<MessageDto[]> {
        const messageRepository = AppDataSource.getRepository(Message);
        const sentToUserMessages = await messageRepository.find({ where: { to: user.userId } });
        const sentByUserMessages = await messageRepository.find({ where: { from: user.userId } });
        const allMessages = sentToUserMessages
            .concat(sentByUserMessages)
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

        const messages = [];
        for (const message of allMessages) {
            messages.push({
                to: message.to,
                from: message.from,
                content: message.content,
            });
        }

        return messages;
    }
}

export const messageService = new MessageService();
