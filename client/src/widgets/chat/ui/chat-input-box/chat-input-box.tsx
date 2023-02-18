import { FC } from "react";
import { Form } from "antd";
import styled from "styled-components";

import { createMessage, IMessageValues, replyToSelectedMessage } from "../../../../entities/message";
import { sendMessage } from "../../../../entities/message";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";
import { SendMessageButton } from "../../../../shared/ui";

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
    justify-content: space-evenly;
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
    const userId = useAppSelector((state) => state.auth.user?.userId);
    const selectedMessageToReply = useAppSelector((state) => state.message.selectedMessageToReply);

    const onFinish = (values: IMessageValues) => {
        if (userId) {
            const message = createMessage({
                to: friendId,
                from: userId,
                content: values.message,
                isPrevMessageReplied: !!selectedMessageToReply,
            });
            if (selectedMessageToReply) {
                dispatch(replyToSelectedMessage(selectedMessageToReply));
            }
            dispatch(sendMessage(message));
            form.resetFields();
        }
    };

    return (
        <StyledWrapper>
            <StyledForm form={form} name="message-form" onFinish={(values) => onFinish(values as IMessageValues)}>
                <ChatInput form={form} />
                <SendMessageButton />
            </StyledForm>
        </StyledWrapper>
    );
};
