import { memo, useCallback, useState } from "react";
import { Drawer } from "antd";
import styled from "styled-components";
import { MenuOutlined } from "@ant-design/icons";

import { COLORS } from "../../../../shared/const";
import { NavbarMenu } from "../../../../shared/ui";

const StyledMenuIcon = styled(MenuOutlined)`
    color: ${COLORS.MAIN_BLUE};
    font-size: 24px;
    padding: 0.25rem;
`;

export const BurgerMenu = memo(() => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const handleOpenMenu = useCallback(() => {
        setOpenMenu((prevState) => !prevState);
    }, []);

    return (
        <>
            <StyledMenuIcon onClick={handleOpenMenu} />
            <Drawer width={300} placement={"left"} open={openMenu} closable={false} onClose={handleOpenMenu}>
                <NavbarMenu />
            </Drawer>
        </>
    );
});
