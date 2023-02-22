import { FC, useEffect, useRef, KeyboardEvent, useCallback } from "react";
import { Form, FormInstance, Input, InputRef } from "antd";
import styled from "styled-components";

import { MESSAGE_RULES } from "../../../../../shared/const";

interface IChatInputProps {
    form: FormInstance;
}

const StyledInputContainer = styled(Form.Item)`
    margin: 0;
    width: 85%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;

    .ant-input:hover {
        border-color: transparent;
        box-shadow: none;
    }

    .ant-input:focus {
        border-color: transparent;
        box-shadow: none;
    }

    .ant-input {
        border-color: transparent !important;
    }

    .ant-form-item-row {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        .ant-form-item-control {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;

            .ant-form-item-explain {
                display: none;
            }

            .ant-form-item-control-input {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;

                .ant-form-item-control-input-content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }
            }
        }
    }

    input {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        outline: none;
        resize: none;
        border-color: transparent;
        background: lightgray;
        line-height: 0;
        box-shadow: none;
        padding: 0 0 0.2rem 0.5rem;

        .ant-input-status-error {
            border-color: transparent;
        }
    }

    @media only screen and (min-width: 1080px) {
        width: 90%;
    }
`;

export const ChatInput: FC<IChatInputProps> = ({ form }) => {
    const inputRef = useRef<InputRef>(null);

    const onEnterPress = useCallback(
        (e: KeyboardEvent) => {
            e.preventDefault();
            form.submit();
        },
        [form],
    );

    useEffect(() => {
        requestAnimationFrame(() => inputRef.current?.focus());
    });

    return (
        <StyledInputContainer name="message" rules={MESSAGE_RULES.MESSAGE}>
            <Input ref={inputRef} placeholder="Write a message..." onPressEnter={onEnterPress} autoComplete="off" />
        </StyledInputContainer>
    );
};
