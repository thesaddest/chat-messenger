import { FC, memo, useState } from "react";
import { Drawer, Menu } from "antd";
import styled from "styled-components";
import { MenuOutlined } from "@ant-design/icons";

import { COLORS } from "../../const";
import { AddFriend } from "../../../features/add-friend";
import { CreateRoom } from "../../../features/create-room";
import { SearchFriend } from "../../../features/search-friend";

const StyledNavbarMenu = styled(Menu)`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
`;

const StyledMenuIcon = styled(MenuOutlined)`
    color: ${COLORS.MAIN_BLUE};
    font-size: 24px;
    padding: 0.25rem;
`;

const NavbarMenu = memo(() => (
    <StyledNavbarMenu
        style={{ borderInlineEnd: 0 }}
        items={[
            {
                label: <AddFriend />,
                key: "1",
            },
            {
                label: <CreateRoom />,
                key: "2",
            },
            {
                label: <SearchFriend />,
                key: "3",
            },
        ]}
    />
));

export const BurgerMenu: FC = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const handleOpenMenu = () => {
        setOpenMenu((prevState) => !prevState);
    };

    return (
        <>
            <StyledMenuIcon onClick={handleOpenMenu} />
            <Drawer width={300} placement={"left"} open={openMenu} closable={false} onClose={handleOpenMenu}>
                <NavbarMenu />
            </Drawer>
        </>
    );
};
