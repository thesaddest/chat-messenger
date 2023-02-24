import { Button } from "antd";
import { memo, MouseEventHandler, ReactNode } from "react";
import { ButtonType } from "antd/es/button";
import styled from "styled-components";

interface INavbarButtonProps {
    onClick: MouseEventHandler<HTMLElement>;
    type: ButtonType;
    children: ReactNode;
    danger?: boolean;
}

const StyledButton = styled(Button)`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
`;

export const NavbarButton = memo<INavbarButtonProps>(({ onClick, type, children, danger }) => {
    return (
        <StyledButton onClick={onClick} type={type} danger={danger}>
            {children}
        </StyledButton>
    );
});
