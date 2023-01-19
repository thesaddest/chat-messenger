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

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  padding: 1rem 0;
`;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  background: lightgray;
`;

const StyledFormItemTextAreaContainer = styled(Form.Item)`
  margin: 0;
  width: 90%;
  height: 100%;

  .ant-input {
    border-color: transparent !important;
    box-shadow: none !important;
  }

  .ant-input:hover {
    border-color: transparent !important;
    box-shadow: none !important;
  }

  .ant-input:focus {
    border-color: transparent;
    box-shadow: none;
  }

  textarea {
    outline: none;
    resize: none;
    border-color: transparent;
    background: lightgray;

    .ant-input-status-success {
      border-color: transparent;
    }

  }

  @media only screen and (max-width: 768px) {
    width: 70%;
  }
`;

const StyledFormItemButtonContainer = styled(Form.Item)`
  display: flex;
  justify-content: center;
  width: 15%;
  margin: 0;
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
        <StyledWrapper>
            <StyledForm form={form} name="message-form" onFinish={(values) => onFinish(values as IMessageValues)}>
                <StyledFormItemTextAreaContainer name="message" rules={MESSAGE_RULES.MESSAGE}>
                    <TextArea placeholder="Write a message..." onPressEnter={(e) => onEnterPress(e)} />
                </StyledFormItemTextAreaContainer>
                <StyledFormItemButtonContainer>
                    <StyledButton block type="primary" htmlType="submit">
                        <SendOutlined />
                    </StyledButton>
                </StyledFormItemButtonContainer>
            </StyledForm>
        </StyledWrapper>

    );
};
