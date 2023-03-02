import { memo, ReactNode } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { ButtonType } from "antd/es/button/button";

interface IInputButtonProps {
    icon: ReactNode;
    block?: boolean;
    type: ButtonType;
    htmlType?: any;
}

const StyledButton = styled(Button)`
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 0.5rem;
    height: 36px;

    @media only screen and (min-width: 1080px) {
        display: flex;
        height: 40px;
        width: 40px;
    }
`;

export const InputButton = memo<IInputButtonProps>(({ block, icon, type, htmlType }) => (
    <StyledButton block={block} type={type} htmlType={htmlType}>
        {icon}
    </StyledButton>
));
