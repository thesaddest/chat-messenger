import { Button } from "antd";
import { memo, MouseEventHandler, ReactNode } from "react";
import { ButtonType } from "antd/es/button";

interface INavbarProps {
    onClick: MouseEventHandler<HTMLElement>;
    type: ButtonType;
    children: ReactNode;
    danger?: boolean;
}

export const NavbarButton = memo<INavbarProps>(({ onClick, type, children, danger }) => {
    return (
        <Button onClick={onClick} type={type} danger={danger}>
            {children}
        </Button>
    );
});
