import { Button } from "antd";
import { memo, MouseEventHandler, ReactNode } from "react";
import { ButtonType } from "antd/es/button";
import styled from "styled-components";
import { ButtonShape } from "antd/es/button/button";
import { SizeType } from "antd/es/config-provider/SizeContext";

interface IMenuButtonProps {
    onClick?: MouseEventHandler<HTMLElement>;
    type: ButtonType;
    children: ReactNode;
    danger?: boolean;
    shape?: ButtonShape;
    size?: SizeType;
}

const StyledButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const MenuButton = memo<IMenuButtonProps>(({ onClick, type, children, danger, shape, size }) => {
    return (
        <StyledButton onClick={onClick} type={type} danger={danger} shape={shape} size={size}>
            {children}
        </StyledButton>
    );
});
