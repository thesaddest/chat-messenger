import { v4 as uuidv4 } from "uuid";
import { Message } from "./message.entity.js";
import { AppDataSource } from "../db/database.js";
import { MessageDto } from "./message.dto.js";
import { User } from "../user/user.entity.js";

class MessageService {
    async createMessage({ to, from, content, isMessageRead }: MessageDto, user: User): Promise<MessageDto> {
        const messageRepository = AppDataSource.getRepository(Message);
        const newMessage = {
            messageId: uuidv4(),
            to: to,
            from: from,
            content: content,
            friend: user,
            isMessageRead: isMessageRead,
        };
        const message = messageRepository.create(newMessage);
        await messageRepository.save(message);

        return {
            messageId: message.messageId,
            to: message.to,
            from: message.from,
            content: message.content,
            isMessageSelected: false,
            isMessageRead: isMessageRead,
        };
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
                messageId: message.messageId,
                to: message.to,
                from: message.from,
                content: message.content,
                isMessageSelected: false,
                isMessageRead: message.isMessageRead,
            });
        }

        return messages;
    }

    async deleteMessages(messages: MessageDto[]): Promise<MessageDto[]> {
        const messageRepository = AppDataSource.getRepository(Message);
        const messagesToDelete = await Promise.all(
            messages.map(({ messageId }) => messageRepository.findOneBy({ messageId: messageId })),
        );

        const deletedMessages = await messageRepository.remove(messagesToDelete);

        return deletedMessages.map((message) => ({
            messageId: message.messageId,
            to: message.to,
            from: message.from,
            content: message.content,
            isMessageSelected: false,
            isMessageRead: message.isMessageRead,
        }));
    }

    async readMessages(messages: MessageDto[]): Promise<MessageDto[]> {
        const messageRepository = AppDataSource.getRepository(Message);
        const messagesToRead = await Promise.all(
            messages.map(({ messageId }) => messageRepository.findOneBy({ messageId: messageId })),
        );
        const readMessages = messagesToRead.map((messageToRead) => {
            return {
                messageId: messageToRead.messageId,
                to: messageToRead.to,
                from: messageToRead.from,
                content: messageToRead.content,
                isMessageSelected: false,
                isMessageRead: true,
            };
        });
        return messageRepository.save(readMessages);
    }
}

export const messageService = new MessageService();
