import { FC } from "react";
import { Form } from "antd";
import styled from "styled-components";

import { IMessage, IMessageValues } from "../../../../entities/message";
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
    padding-top: 1rem;
`;

const StyledForm = styled(Form)`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    background: lightgray;
`;

export const ChatInputBox: FC<ChatInputBoxProps> = ({ friendId }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.user?.userId);

    const onFinish = (values: IMessageValues) => {
        if (userId) {
            const message: IMessage = { to: friendId, from: userId, content: values.message, messageId: "" };
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
