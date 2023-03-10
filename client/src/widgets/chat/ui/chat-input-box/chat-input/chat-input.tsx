import { FC, useEffect, useRef, KeyboardEvent, useCallback } from "react";
import { Form, FormInstance, Input, InputRef } from "antd";
import styled from "styled-components";

import { MESSAGE_RULES } from "../../../../../shared/const";
import { IFile, IPendingAttachedFile, isSendMessageNeedDisable } from "../../../../../entities/file";

interface IChatInputProps {
    form: FormInstance;
    uploadedFiles: IFile[];
    pendingFiles: IPendingAttachedFile[];
    friendIdActiveKey: string;
}

const StyledInputContainer = styled(Form.Item)`
    margin: 0;
    width: 85%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;

    .ant-input {
        box-shadow: none !important;
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
        background: transparent;
        line-height: 0;
        box-shadow: none;
        padding: 0 0 0.2rem 0.5rem;
    }

    @media only screen and (min-width: 1080px) {
        width: 90%;
    }
`;

export const ChatInput: FC<IChatInputProps> = ({ form, friendIdActiveKey, pendingFiles, uploadedFiles }) => {
    const inputRef = useRef<InputRef>(null);

    const onEnterPress = useCallback(
        (e: KeyboardEvent) => {
            e.preventDefault();
            if (!isSendMessageNeedDisable(friendIdActiveKey, pendingFiles)) {
                form.submit();
            }
        },
        [form, friendIdActiveKey, pendingFiles],
    );

    useEffect(() => {
        requestAnimationFrame(() => inputRef.current?.focus());
    });

    return (
        <StyledInputContainer name="message" rules={uploadedFiles.length === 0 ? MESSAGE_RULES.MESSAGE : undefined}>
            <Input ref={inputRef} placeholder="Write a message..." onPressEnter={onEnterPress} autoComplete="off" />
        </StyledInputContainer>
    );
};
