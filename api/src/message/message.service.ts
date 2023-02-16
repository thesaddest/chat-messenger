import { v4 as uuidv4 } from "uuid";
import { Message } from "./message.entity.js";
import { AppDataSource } from "../db/database.js";
import { MessageDto } from "./message.dto.js";
import { User } from "../user/user.entity.js";
import { userService } from "../user/user.service.js";

class MessageService {
    async createMessage(messageDto: MessageDto, user: User): Promise<MessageDto> {
        const messageRepository = AppDataSource.getRepository(Message);
        const newMessage = {
            messageId: uuidv4(),
            to: messageDto.to,
            from: messageDto.from,
            content: messageDto.content,
            friend: user,
            isMessageRead: messageDto.isMessageRead,
            isMessageForwarded: messageDto.isMessageForwarded,
        };
        const message = messageRepository.create(newMessage);
        await messageRepository.save(message);

        return {
            messageId: message.messageId,
            to: message.to,
            from: message.from,
            content: message.content,
            isMessageSelected: false,
            isMessageRead: message.isMessageRead,
            isMessageForwarded: message.isMessageForwarded,
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
                isMessageForwarded: message.isMessageForwarded,
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
            isMessageForwarded: message.isMessageForwarded,
        }));
    }

    async readMessages(messages: MessageDto[]): Promise<MessageDto[]> {
        const messageRepository = AppDataSource.getRepository(Message);
        return await Promise.all(
            messages.map(async ({ messageId }) => {
                const messageInRepository = await messageRepository.findOneBy({ messageId: messageId });
                messageInRepository.isMessageRead = true;
                const savedReadMessage = await messageRepository.save(messageInRepository);
                return {
                    messageId: savedReadMessage.messageId,
                    to: savedReadMessage.to,
                    from: savedReadMessage.from,
                    content: savedReadMessage.content,
                    isMessageSelected: false,
                    isMessageRead: savedReadMessage.isMessageRead,
                    isMessageForwarded: savedReadMessage.isMessageForwarded,
                    forwardedFrom: await userService.getUsernameByUserId(savedReadMessage.from),
                };
            }),
        );
    }

    async createForwardedMessage(messageDto: MessageDto, user: User, to: string) {
        const messageRepository = AppDataSource.getRepository(Message);
        const newMessage = {
            messageId: uuidv4(),
            to: to,
            from: messageDto.from,
            content: messageDto.content,
            friend: user,
            isMessageRead: messageDto.isMessageRead,
            isMessageForwarded: true,
        };
        const forwardedMessage = messageRepository.create(newMessage);
        await messageRepository.save(forwardedMessage);

        return {
            messageId: forwardedMessage.messageId,
            to: forwardedMessage.to,
            from: forwardedMessage.from,
            content: forwardedMessage.content,
            isMessageSelected: false,
            isMessageRead: forwardedMessage.isMessageRead,
            isMessageForwarded: forwardedMessage.isMessageForwarded,
        };
    }

    async forwardMessages(messages: MessageDto[], user: User, to: string): Promise<MessageDto[]> {
        return await Promise.all(
            messages.map(async (message) => {
                const createdForwardedMessage = await this.createForwardedMessage(message, user, to);
                return {
                    messageId: createdForwardedMessage.messageId,
                    to: createdForwardedMessage.to,
                    from: createdForwardedMessage.from,
                    content: createdForwardedMessage.content,
                    isMessageSelected: false,
                    isMessageRead: createdForwardedMessage.isMessageRead,
                    isMessageForwarded: createdForwardedMessage.isMessageForwarded,
                    forwardedFrom: await userService.getUsernameByUserId(createdForwardedMessage.from),
                };
            }),
        );
    }
}

export const messageService = new MessageService();
