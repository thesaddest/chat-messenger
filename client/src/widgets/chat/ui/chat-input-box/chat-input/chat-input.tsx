import React, { FC, useEffect, useRef } from "react";
import { Form, FormInstance, Input } from "antd";
import styled from "styled-components";

import { MESSAGE_RULES } from "../../../../../shared/const";

interface IChatInputProps {
    form: FormInstance;
}

const { TextArea } = Input;

const StyledFormItemTextAreaContainer = styled(Form.Item)`
    margin: 0;
    width: 90%;
    height: 100%;

    .ant-input {
        border-color: transparent;
        box-shadow: none;
    }

    .ant-input:hover {
        border-color: transparent;
        box-shadow: none;
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

export const ChatInput: FC<IChatInputProps> = ({ form }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        form.submit();
    };

    useEffect(() => {
        requestAnimationFrame(() => textAreaRef.current?.focus());
    });

    return (
        <StyledFormItemTextAreaContainer name="message" rules={MESSAGE_RULES.MESSAGE}>
            <TextArea ref={textAreaRef} placeholder="Write a message..." onPressEnter={onEnterPress} />
        </StyledFormItemTextAreaContainer>
    );
};
