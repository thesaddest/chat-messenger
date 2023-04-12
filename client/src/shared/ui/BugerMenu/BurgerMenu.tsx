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
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .ant-menu-item {
        background-color: transparent !important;
    }
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
                label: <SearchFriend />,
                key: "1",
            },
            {
                label: <AddFriend />,
                key: "2",
            },
            {
                label: <CreateRoom />,
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
