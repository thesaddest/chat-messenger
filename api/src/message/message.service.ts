import { v4 as uuidv4 } from "uuid";
import { Message } from "./message.entity.js";
import { AppDataSource } from "../db/database.js";
import { MessageDto } from "./message.dto.js";
import { User } from "../user/user.entity.js";
import { userService } from "../user/user.service.js";
import { File } from "../file/file.entity.js";
import { fileService } from "../file/file.service.js";
import { roomService } from "../room/room.service.js";
import { steganographyService } from "../steganography/steganography.service.js";
import { s3Service } from "../s3/s3.service.js";

class MessageService {
    async createMessage(messageDto: MessageDto, user: User): Promise<MessageDto> {
        const messageRepository = AppDataSource.getRepository(Message);
        const newMessage = {
            messageId: uuidv4(),
            to: messageDto.to,
            from: messageDto.from,
            fromUsername: await userService.getUsernameByUserId(messageDto.from),
            content: messageDto.content,
            friend: user,
            isMessageRead: messageDto.isMessageRead,
            isMessageForwarded: messageDto.isMessageForwarded,
            prevMessageContent: messageDto.prevMessageContent,
            prevMessageFrom: messageDto.prevMessageFrom,
            isGroupMessage: await roomService.isRoomExists(messageDto.to),
            isHiddenMessage: messageDto.isHiddenMessage,
            hiddenS3Location: messageDto.hiddenS3Location,
            files: messageDto.attachedFilesAfterUpload,
        };
        const message = messageRepository.create(newMessage);
        await messageRepository.save(message);

        const fileRepository = AppDataSource.getRepository(File);

        //File to message assigment
        if (messageDto.attachedFilesAfterUpload) {
            for (const attachedFile of messageDto.attachedFilesAfterUpload) {
                await fileRepository.update({ fileId: attachedFile.fileId }, { message: message });
            }
        }

        return {
            messageId: message.messageId,
            to: message.to,
            from: message.from,
            fromUsername: message.fromUsername,
            content: message.content,
            isMessageSelected: false,
            isMessageRead: message.isMessageRead,
            isMessageForwarded: message.isMessageForwarded,
            prevMessageContent: message.prevMessageContent,
            prevMessageFrom: message.prevMessageFrom,
            isGroupMessage: message.isGroupMessage,
            isHiddenMessage: message.isHiddenMessage,
            hiddenS3Location: message.hiddenS3Location,
            attachedFilesAfterUpload: message.files,
        };
    }

    async getUserMessages(user: User): Promise<MessageDto[]> {
        const messageRepository = AppDataSource.getRepository(Message);
        const sentToUserMessages = await messageRepository.find({ where: { to: user.userId } });
        const sentByUserMessages = await messageRepository.find({ where: { from: user.userId } });
        const userRooms = await roomService.getUserRooms(user);

        const messagesInRooms: Message[] = [];
        for (const userRoom of userRooms) {
            const messagesToPush = await messageRepository.find({ where: { to: userRoom.roomId } });
            messagesInRooms.push(...messagesToPush);
        }

        const allMessages = sentByUserMessages
            .concat(sentToUserMessages, messagesInRooms)
            //filter is needed to avoid duplicates
            .filter((message, index, self) => index === self.findIndex((m) => m.messageId === message.messageId))
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

        const messages = [];
        for (const message of allMessages) {
            messages.push({
                messageId: message.messageId,
                to: message.to,
                from: message.from,
                fromUsername: message.fromUsername,
                content: message.content,
                isMessageSelected: false,
                isMessageRead: message.isMessageRead,
                isMessageForwarded: message.isMessageForwarded,
                prevMessageContent: message.prevMessageContent,
                prevMessageFrom: message.prevMessageFrom,
                isGroupMessage: message.isGroupMessage,
                isHiddenMessage: message.isHiddenMessage,
                hiddenS3Location: message.hiddenS3Location,
                attachedFilesAfterUpload: message.files,
            });
        }

        return messages;
    }

    async deleteMessages(messages: MessageDto[]): Promise<MessageDto[]> {
        const messageRepository = AppDataSource.getRepository(Message);
        const messagesToDelete = await Promise.all(
            messages.map(({ messageId }) => messageRepository.findOneBy({ messageId: messageId })),
        );

        for (const message of messagesToDelete) {
            if (message.files) {
                await fileService.deleteFiles(message.files);
            }
            if (message.hiddenS3Location) {
                const uploadedObjectKey = await s3Service.getUploadedObjectKey(message.hiddenS3Location);
                await s3Service.deleteObject(uploadedObjectKey);
            }
        }

        const deletedMessages = await messageRepository.remove(messagesToDelete);

        return deletedMessages.map((message) => ({
            messageId: message.messageId,
            to: message.to,
            from: message.from,
            fromUsername: message.fromUsername,
            content: message.content,
            isMessageSelected: false,
            isMessageRead: message.isMessageRead,
            isMessageForwarded: message.isMessageForwarded,
            prevMessageContent: message.prevMessageContent,
            prevMessageFrom: message.prevMessageFrom,
            isHiddenMessage: message.isHiddenMessage,
            hiddenS3Location: message.hiddenS3Location,
            isGroupMessage: message.isGroupMessage,
            attachedFilesAfterUpload: message.files,
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
                    fromUsername: savedReadMessage.fromUsername,
                    content: savedReadMessage.content,
                    isMessageSelected: false,
                    isMessageRead: savedReadMessage.isMessageRead,
                    isMessageForwarded: savedReadMessage.isMessageForwarded,
                    forwardedFrom: await userService.getUsernameByUserId(savedReadMessage.from),
                    prevMessageContent: savedReadMessage.prevMessageContent,
                    prevMessageFrom: savedReadMessage.prevMessageFrom,
                    isGroupMessage: savedReadMessage.isGroupMessage,
                    isHiddenMessage: savedReadMessage.isHiddenMessage,
                    hiddenS3Location: savedReadMessage.hiddenS3Location,
                    attachedFilesAfterUpload: savedReadMessage.files,
                };
            }),
        );
    }

    async createForwardedMessage(messageDto: MessageDto, user: User, from: string, to: string): Promise<MessageDto> {
        const messageRepository = AppDataSource.getRepository(Message);
        const newMessage = {
            messageId: uuidv4(),
            to: to,
            from: from,
            fromUsername: await userService.getUsernameByUserId(from),
            content: messageDto.content,
            friend: user,
            isMessageRead: messageDto.isMessageRead,
            isMessageForwarded: true,
            prevMessageContent: messageDto.prevMessageContent,
            prevMessageFrom: messageDto.prevMessageFrom,
            isGroupMessage: await roomService.isRoomExists(messageDto.to),
            isHiddenMessage: messageDto.isHiddenMessage,
            hiddenS3Location: messageDto.hiddenS3Location,
            files: messageDto.attachedFilesAfterUpload,
        };
        const forwardedMessage = messageRepository.create(newMessage);
        await messageRepository.save(forwardedMessage);

        return {
            messageId: forwardedMessage.messageId,
            to: forwardedMessage.to,
            from: forwardedMessage.from,
            fromUsername: forwardedMessage.fromUsername,
            content: forwardedMessage.content,
            isMessageSelected: false,
            isMessageRead: forwardedMessage.isMessageRead,
            isMessageForwarded: forwardedMessage.isMessageForwarded,
            prevMessageContent: forwardedMessage.prevMessageContent,
            prevMessageFrom: forwardedMessage.prevMessageFrom,
            isGroupMessage: forwardedMessage.isGroupMessage,
            isHiddenMessage: forwardedMessage.isHiddenMessage,
            hiddenS3Location: forwardedMessage.hiddenS3Location,
            attachedFilesAfterUpload: messageDto.attachedFilesAfterUpload,
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
                    fromUsername: createdForwardedMessage.fromUsername,
                    content: createdForwardedMessage.content,
                    isMessageSelected: false,
                    isMessageRead: createdForwardedMessage.isMessageRead,
                    isMessageForwarded: createdForwardedMessage.isMessageForwarded,
                    forwardedFrom: await userService.getUsernameByUserId(message.from),
                    prevMessageContent: createdForwardedMessage.prevMessageContent,
                    prevMessageFrom: createdForwardedMessage.prevMessageFrom,
                    isGroupMessage: createdForwardedMessage.isGroupMessage,
                    isHiddenMessage: createdForwardedMessage.isHiddenMessage,
                    hiddenS3Location: createdForwardedMessage.hiddenS3Location,
                    attachedFilesAfterUpload: createdForwardedMessage.attachedFilesAfterUpload,
                };
            }),
        );
    }

    async replyToMessage(newMessage: MessageDto, repliedMessage: MessageDto, user: User): Promise<MessageDto> {
        const repliedMessageToSaveInDb = {
            messageId: newMessage.messageId,
            to: newMessage.to,
            from: newMessage.from,
            fromUsername: await userService.getUsernameByUserId(newMessage.from),
            content: newMessage.content,
            isMessageSelected: false,
            isMessageRead: newMessage.isMessageRead,
            isMessageForwarded: newMessage.isMessageForwarded,
            forwardedFrom: newMessage.forwardedFrom,
            prevMessageContent: repliedMessage.content,
            prevMessageFrom: await userService.getUsernameByUserId(repliedMessage.from),
            isGroupMessage: await roomService.isRoomExists(newMessage.to),
            isHiddenMessage: repliedMessage.isHiddenMessage,
            hiddenS3Location: repliedMessage.hiddenS3Location,
            files: repliedMessage.attachedFilesAfterUpload,
        };

        const dbMessage = await this.createMessage(repliedMessageToSaveInDb, user);
        return {
            messageId: dbMessage.messageId,
            to: dbMessage.to,
            from: dbMessage.from,
            fromUsername: dbMessage.fromUsername,
            content: dbMessage.content,
            isMessageSelected: false,
            isMessageRead: dbMessage.isMessageRead,
            isMessageForwarded: dbMessage.isMessageForwarded,
            forwardedFrom: dbMessage.forwardedFrom,
            prevMessageContent: dbMessage.prevMessageContent,
            prevMessageFrom: dbMessage.prevMessageFrom,
            isGroupMessage: dbMessage.isGroupMessage,
            isHiddenMessage: dbMessage.isHiddenMessage,
            hiddenS3Location: dbMessage.hiddenS3Location,
            attachedFilesAfterUpload: dbMessage.attachedFilesAfterUpload,
        };
    }

    async hideMessage(messageDto: MessageDto, user: User): Promise<MessageDto> {
        const messageRepository = AppDataSource.getRepository(Message);
        const dbMessage = await this.createMessage(messageDto, user);
        const embeddedMessage = await steganographyService.embedMessage(dbMessage.content);
        //We use the .update method instead of the .save method as the latter generates a new entity, a behavior that is not required in our current implementation.
        await messageRepository.update(
            { messageId: dbMessage.messageId },
            {
                isHiddenMessage: true,
                content: "hidden",
                friendDeviceId: await userService.getDeviceIdByUserId(dbMessage.to),
                hiddenS3Location: await s3Service.uploadImageWithHiddenMessage(user.username, embeddedMessage),
            },
        );

        const updatedMessage = await messageRepository.findOne({ where: { messageId: dbMessage.messageId } });
        return {
            messageId: updatedMessage.messageId,
            to: updatedMessage.to,
            from: updatedMessage.from,
            fromUsername: updatedMessage.fromUsername,
            content: updatedMessage.content,
            isMessageSelected: false,
            isMessageRead: updatedMessage.isMessageRead,
            isMessageForwarded: updatedMessage.isMessageForwarded,
            prevMessageContent: updatedMessage.prevMessageContent,
            prevMessageFrom: updatedMessage.prevMessageFrom,
            isGroupMessage: updatedMessage.isGroupMessage,
            isHiddenMessage: updatedMessage.isHiddenMessage,
            hiddenS3Location: updatedMessage.hiddenS3Location,
            attachedFilesAfterUpload: updatedMessage.files,
        };
    }

    async revealHiddenMessage(messageDto: MessageDto): Promise<MessageDto> {
        const messageContent = await steganographyService.revealMessage(messageDto.hiddenS3Location);
        const messageRepository = AppDataSource.getRepository(Message);

        const dbMessage = await messageRepository.findOne({ where: { messageId: messageDto.messageId } });
        dbMessage.content = messageContent;
        dbMessage.isHiddenMessage = false;
        await messageRepository.save(dbMessage);

        return {
            messageId: dbMessage.messageId,
            to: dbMessage.to,
            from: dbMessage.from,
            fromUsername: dbMessage.fromUsername,
            content: dbMessage.content,
            isMessageSelected: false,
            isMessageRead: dbMessage.isMessageRead,
            isMessageForwarded: dbMessage.isMessageForwarded,
            prevMessageContent: dbMessage.prevMessageContent,
            prevMessageFrom: dbMessage.prevMessageFrom,
            isGroupMessage: dbMessage.isGroupMessage,
            isHiddenMessage: dbMessage.isHiddenMessage,
            hiddenS3Location: dbMessage.hiddenS3Location,
            attachedFilesAfterUpload: dbMessage.files,
        };
    }

    async getFriendDeviceIdFromMessage(messageId: string): Promise<string> {
        const messageRepository = AppDataSource.getRepository(Message);
        const dbMessage = await messageRepository.findOne({ where: { messageId: messageId } });

        return dbMessage.friendDeviceId;
    }
}

export const messageService = new MessageService();
