import { SendOutlined } from "@ant-design/icons";
import { memo } from "react";
import styled from "styled-components";
import { Button, Form } from "antd";

const StyledFormItemButtonContainer = styled(Form.Item)`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 15%;
    height: 100%;
    margin: 0;
    padding-right: 0.15rem;

    @media only screen and (min-width: 1080px) {
        width: 10%;
        display: flex;
    }
`;

const StyledButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 0.5rem;
    height: 36px;

    @media only screen and (min-width: 1080px) {
        height: 40px;
        width: 40px;
    }
`;

export const SendMessageButton = memo(() => (
    <StyledFormItemButtonContainer>
        <StyledButton block type="primary" htmlType="submit">
            <SendOutlined />
        </StyledButton>
    </StyledFormItemButtonContainer>
));
