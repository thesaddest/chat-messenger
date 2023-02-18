import { FC, useEffect, useRef, KeyboardEvent } from "react";
import { Form, FormInstance, Input, InputRef } from "antd";
import styled from "styled-components";

import { MESSAGE_RULES } from "../../../../../shared/const";

interface IChatInputProps {
    form: FormInstance;
}

const StyledFormItemTextAreaContainer = styled(Form.Item)`
    margin: 0;
    width: 70%;
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

    input {
        outline: none;
        resize: none;
        border-color: transparent;
        background: lightgray;
        line-height: 0;

        .ant-input-status-success {
            border-color: transparent;
        }
    }
`;

export const ChatInput: FC<IChatInputProps> = ({ form }) => {
    const inputRef = useRef<InputRef>(null);

    const onEnterPress = (e: KeyboardEvent) => {
        e.preventDefault();
        form.submit();
    };

    useEffect(() => {
        requestAnimationFrame(() => inputRef.current?.focus());
    });

    return (
        <StyledFormItemTextAreaContainer name="message" rules={MESSAGE_RULES.MESSAGE}>
            <Input ref={inputRef} placeholder="Write a message..." onPressEnter={onEnterPress} />
        </StyledFormItemTextAreaContainer>
    );
};
