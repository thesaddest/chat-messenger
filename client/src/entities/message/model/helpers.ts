import { IFriend } from "../../friend";
import { IRoom } from "../../room";

import { IMessage } from "./interfaces";

export const getFilteredMessageByChatType = (messages: IMessage[], chat: IFriend | IRoom): IMessage[] => {
    if ("roomId" in chat) {
        return messages.filter(
            (message) => message.to === (chat.roomId || message.from === chat.roomId) && message.isGroupMessage,
        );
    } else {
        return messages.filter(
            (message) =>
                (message.to === chat.userBehindFriend || message.from === chat.userBehindFriend) &&
                !message.isGroupMessage,
        );
    }
};

export const getLastMessageByChatType = (messages: IMessage[], chat: IFriend | IRoom): IMessage => {
    const filteredMessages = getFilteredMessageByChatType(messages, chat);
    return filteredMessages[filteredMessages.length - 1];
};

export const getUnreadMessageAmount = (
    readMessages: IMessage[],
    messages: IMessage[],
    chat: IFriend | IRoom,
): number => {
    const allMessagesInChat = getFilteredMessageByChatType(messages, chat);
    if ("roomId" in chat) {
        const messagesSentFromFriend = allMessagesInChat.filter(({ from }) => from === chat.roomId);
        const unreadMessages = messagesSentFromFriend.filter(
            (messageSentFromFriend) =>
                !readMessages.find(({ messageId }) => messageSentFromFriend.messageId === messageId),
        );
        return unreadMessages.length;
    } else {
        const messagesSentFromFriend = allMessagesInChat.filter(({ from }) => from === chat.userBehindFriend);
        const unreadMessages = messagesSentFromFriend.filter(
            (messageSentFromFriend) =>
                !readMessages.find(({ messageId }) => messageSentFromFriend.messageId === messageId),
        );
        return unreadMessages.length;
    }
};

export const setMessagesStateWithUniqueValues = (
    messagesState: IMessage[],
    messagesInPayload: IMessage[],
): IMessage[] => {
    return messagesState.concat(
        messagesInPayload.filter(
            ({ messageId }) => !messagesState.find((messageInReadState) => messageInReadState.messageId === messageId),
        ),
    );
};

export const setMessagesStateAfterReadStatusUpdate = (
    messagesInState: IMessage[],
    messagesInPayload: IMessage[],
): IMessage[] => {
    return messagesInState.map(
        (messageInState) =>
            messagesInPayload.find(({ messageId }) => messageId === messageInState.messageId) || messageInState,
    );
};

export const setMessageStateAfterDeleteMessages = (messagesInState: IMessage[], messagesInPayload: IMessage[]) => {
    return messagesInState.filter(
        (messageInState) =>
            !messagesInPayload.some((messageInPayload) => messageInPayload.messageId === messageInState.messageId),
    );
};

export const setMessageStateWithUniqueValue = (messagesInState: IMessage[], messageInPayload: IMessage): IMessage[] => {
    return messagesInState.map((messageInState) =>
        messageInState.messageId === messageInPayload.messageId ? messageInPayload : messageInState,
    );
};

export const deleteMessageFromState = (messagesInState: IMessage[], messageInPayload: IMessage): IMessage[] => {
    return messagesInState.filter((messageInState) => messageInState.messageId !== messageInPayload.messageId);
};
