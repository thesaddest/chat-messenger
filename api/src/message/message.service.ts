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
            isPrevMessageReplied: messageDto.isPrevMessageReplied,
            prevMessageContent: messageDto.prevMessageContent,
            prevMessageFrom: messageDto.prevMessageFrom,
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
            isPrevMessageReplied: message.isPrevMessageReplied,
            prevMessageContent: message.prevMessageContent,
            prevMessageFrom: message.prevMessageFrom,
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
                isPrevMessageReplied: message.isPrevMessageReplied,
                prevMessageContent: message.prevMessageContent,
                prevMessageFrom: message.prevMessageFrom,
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
            isPrevMessageReplied: message.isPrevMessageReplied,
            prevMessageContent: message.prevMessageContent,
            prevMessageFrom: message.prevMessageFrom,
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
                    isPrevMessageReplied: savedReadMessage.isPrevMessageReplied,
                    prevMessageContent: savedReadMessage.prevMessageContent,
                    prevMessageFrom: savedReadMessage.prevMessageFrom,
                };
            }),
        );
    }

    async createForwardedMessage(messageDto: MessageDto, user: User, from: string, to: string) {
        const messageRepository = AppDataSource.getRepository(Message);
        const newMessage = {
            messageId: uuidv4(),
            to: to,
            from: from,
            content: messageDto.content,
            friend: user,
            isMessageRead: messageDto.isMessageRead,
            isMessageForwarded: true,
            isPrevMessageReplied: messageDto.isPrevMessageReplied,
            prevMessageContent: messageDto.prevMessageContent,
            prevMessageFrom: messageDto.prevMessageFrom,
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
            isPrevMessageReplied: forwardedMessage.isPrevMessageReplied,
            prevMessageContent: forwardedMessage.prevMessageContent,
            prevMessageFrom: forwardedMessage.prevMessageFrom,
        };
    }

    async forwardMessages(messages: MessageDto[], user: User, from: string, to: string): Promise<MessageDto[]> {
        return await Promise.all(
            messages.map(async (message) => {
                const createdForwardedMessage = await this.createForwardedMessage(message, user, from, to);
                return {
                    messageId: createdForwardedMessage.messageId,
                    to: createdForwardedMessage.to,
                    from: createdForwardedMessage.from,
                    content: createdForwardedMessage.content,
                    isMessageSelected: false,
                    isMessageRead: createdForwardedMessage.isMessageRead,
                    isMessageForwarded: createdForwardedMessage.isMessageForwarded,
                    forwardedFrom: await userService.getUsernameByUserId(message.from),
                    isPrevMessageReplied: createdForwardedMessage.isPrevMessageReplied,
                    prevMessageContent: createdForwardedMessage.prevMessageContent,
                    prevMessageFrom: createdForwardedMessage.prevMessageFrom,
                };
            }),
        );
    }

    async replyToMessage(newMessage: MessageDto, repliedMessage: MessageDto, user: User): Promise<MessageDto> {
        const repliedMessageToSaveInDb = {
            messageId: newMessage.messageId,
            to: newMessage.to,
            from: newMessage.from,
            content: newMessage.content,
            isMessageSelected: false,
            isMessageRead: newMessage.isMessageRead,
            isMessageForwarded: newMessage.isMessageForwarded,
            forwardedFrom: newMessage.forwardedFrom,
            isPrevMessageReplied: true,
            prevMessageContent: repliedMessage.content,
            prevMessageFrom: await userService.getUsernameByUserId(repliedMessage.from),
        };

        const messageInDb = await this.createMessage(repliedMessageToSaveInDb, user);
        return {
            messageId: messageInDb.messageId,
            to: messageInDb.to,
            from: messageInDb.from,
            content: messageInDb.content,
            isMessageSelected: false,
            isMessageRead: messageInDb.isMessageRead,
            isMessageForwarded: messageInDb.isMessageForwarded,
            forwardedFrom: messageInDb.forwardedFrom,
            isPrevMessageReplied: messageInDb.isPrevMessageReplied,
            prevMessageContent: messageInDb.prevMessageContent,
            prevMessageFrom: messageInDb.prevMessageFrom,
        };
    }
}

export const messageService = new MessageService();
