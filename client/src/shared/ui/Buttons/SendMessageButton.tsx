import { SendOutlined } from "@ant-design/icons";
import { memo } from "react";
import styled from "styled-components";
import { Button, Form } from "antd";

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

export const SendMessageButton = memo(() => (
    <StyledFormItemButtonContainer>
        <StyledButton block type="primary" htmlType="submit">
            <SendOutlined />
        </StyledButton>
    </StyledFormItemButtonContainer>
));
