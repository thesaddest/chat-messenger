import React, { FC } from "react";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import { SendOutlined } from "@ant-design/icons";

import { MESSAGE_RULES } from "../chat.constants";
import { IMessage, IMessageValues } from "../interfaces";
import { socket } from "../../../../socket-io";
import { SOCKET_EVENTS } from "../../../../socket-io/socket.constants";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { sendMessage } from "../../../../store/message/messageSlice";

const { TextArea } = Input;

interface ChatInputBoxProps {
    friendId: string;
}

//TODO: ask about error in onFinish function
const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 768px) {
    justify-content: space-evenly;
  }
`;

const StyledFormItemTextAreaContainer = styled(Form.Item)`
  width: 85%;

  @media only screen and (max-width: 768px) {
    width: 70%;
  }
`;


const StyledFormItemButtonContainer = styled(Form.Item)`
  display: flex;
  justify-content: center;
  width: 10%;
`;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  border-radius: 45%;
`;


export const ChatInputBox: FC<ChatInputBoxProps> = ({ friendId }) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.auth.user?.userId);

    const onFinish = (values: IMessageValues) => {
        if (userId) {
            const message: IMessage = { to: friendId, from: userId, content: values.message };
            socket.emit(SOCKET_EVENTS.SEND_MESSAGE, message);
            dispatch(sendMessage(message));
            form.resetFields();
        }
    };

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        form.submit();
    };

    return (
        <StyledForm form={form} name="message-form" onFinish={(values) => onFinish(values as IMessageValues)}>
            <StyledFormItemTextAreaContainer name="message" rules={MESSAGE_RULES.MESSAGE}>
                <TextArea placeholder="Message" onPressEnter={(e) => onEnterPress(e)} />
            </StyledFormItemTextAreaContainer>
            <StyledFormItemButtonContainer>
                <StyledButton block type="primary" htmlType="submit">
                    <SendOutlined />
                </StyledButton>
            </StyledFormItemButtonContainer>
        </StyledForm>
    );
};
