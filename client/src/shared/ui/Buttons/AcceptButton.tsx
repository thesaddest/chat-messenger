import { memo, ReactNode } from "react";
import { Button } from "antd";
import { ButtonType } from "antd/es/button/button";
import styled from "styled-components";

import { COLORS } from "../../const";

interface AcceptButtonProps {
    color?: string;
    onClick?: () => void;
    children?: ReactNode;
    type?: ButtonType;
}

const StyledButton = styled(Button)<AcceptButtonProps>`
    color: ${({ color }) => (color ? color : COLORS.MAIN_GREEN)};
    border-color: ${({ color }) => (color ? color : COLORS.MAIN_GREEN)};
`;

export const AcceptButton = memo<AcceptButtonProps>(({ color, onClick, children, type }) => {
    return (
        <StyledButton type={type} color={color} onClick={onClick}>
            {children}
        </StyledButton>
    );
});
