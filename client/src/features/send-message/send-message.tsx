import { memo } from "react";
import styled from "styled-components";
import { Form } from "antd";

import { InputButton } from "../../shared/ui";
import { SendMessageIcon } from "../../shared/ui";

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

export const SendMessage = memo(() => {
    return (
        <StyledFormItemButtonContainer>
            <InputButton type={"primary"} icon={<SendMessageIcon />} htmlType={"submit"} block={true} />
        </StyledFormItemButtonContainer>
    );
});
