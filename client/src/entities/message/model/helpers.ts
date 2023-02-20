import { IFriend } from "../../friend";

import { IMessage } from "./interfaces";

export const getFilteredMessageBySender = (messages: IMessage[], friend: IFriend): IMessage[] => {
    return messages.filter(
        (message) => message.to === friend.userBehindFriend || message.from === friend.userBehindFriend,
    );
};

export const getLastMessageBySender = (messages: IMessage[], friend: IFriend): IMessage => {
    const filteredMessages = getFilteredMessageBySender(messages, friend);
    return filteredMessages[filteredMessages.length - 1];
};

export const getUnreadMessageAmount = (readMessages: IMessage[], messages: IMessage[], friend: IFriend): number => {
    const allMessagesInChat = getFilteredMessageBySender(messages, friend);
    const messagesSentFromFriend = allMessagesInChat.filter(({ from }) => from === friend.userBehindFriend);
    const unreadMessages = messagesSentFromFriend.filter(
        (messageSentFromFriend) => !readMessages.find(({ messageId }) => messageSentFromFriend.messageId === messageId),
    );
    return unreadMessages.length;
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
