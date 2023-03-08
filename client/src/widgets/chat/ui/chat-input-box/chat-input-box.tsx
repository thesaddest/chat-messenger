import { FC } from "react";
import { Form } from "antd";
import styled from "styled-components";

import {
    createMessage,
    deselectMessageToReply,
    IMessageInChatValues,
    replyToMessage,
    sendMessageWithAttachedFiles,
    sendMessage,
} from "../../../../entities/message";
import { clearFileStateAfterUpload } from "../../../../entities/file";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";
import { FileUpload } from "../../../../features/file-upload";
import { SendMessage } from "../../../../features/send-message";

import { ChatInput } from "./chat-input";

interface ChatInputBoxProps {
    friendId: string;
}

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh;
`;

const StyledForm = styled(Form)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background: lightgray;
    border-radius: 20px;
    margin: 0 1rem 0 1rem;
`;

export const ChatInputBox: FC<ChatInputBoxProps> = ({ friendId }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const selectedMessageToReply = useAppSelector((state) => state.message.selectedMessageToReply);
    const files = useAppSelector((state) => state.file.uploadedFiles);

    const onFinish = async (values: IMessageInChatValues) => {
        if (user) {
            const message = createMessage({
                to: friendId,
                from: user.userId,
                content: values.message,
            });
            if (values.uploadedFiles) {
                dispatch(
                    sendMessageWithAttachedFiles({
                        newMessage: message,
                        uploadedFiles: files,
                    }),
                );
                dispatch(clearFileStateAfterUpload(files));
            }
            if (selectedMessageToReply) {
                dispatch(replyToMessage({ newMessage: message, repliedMessage: selectedMessageToReply }));
                dispatch(deselectMessageToReply());
            }
            if (!selectedMessageToReply && !values.uploadedFiles) {
                dispatch(sendMessage(message));
            }
            form.resetFields();
        }
    };

    return (
        <StyledWrapper>
            <StyledForm form={form} name="message-form" onFinish={(values) => onFinish(values as IMessageInChatValues)}>
                {user && <FileUpload username={user.username} />}
                <ChatInput form={form} />
                <SendMessage />
            </StyledForm>
        </StyledWrapper>
    );
};
