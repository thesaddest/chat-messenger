import { memo } from "react";
import styled from "styled-components";
import { Form } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { InputButton } from "../../shared/ui";
import { IPendingAttachedFile, isSendMessageNeedDisable } from "../../entities/file";

interface ISendMessageProps {
    pendingFiles: IPendingAttachedFile[];
    chatId: string;
}

const StyledFormItemButtonContainer = styled(Form.Item)`
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100%;
    margin: 0;
    padding-right: 0.15rem;

    @media only screen and (min-width: 1080px) {
        .ant-form-item-row {
            width: 40px;
        }
    }
`;

export const SendMessage = memo<ISendMessageProps>(({ pendingFiles, chatId }) => {
    return (
        <StyledFormItemButtonContainer>
            <InputButton
                type={"primary"}
                icon={<SendOutlined />}
                htmlType={"submit"}
                block={true}
                disabled={isSendMessageNeedDisable(chatId, pendingFiles)}
            />
        </StyledFormItemButtonContainer>
    );
});
