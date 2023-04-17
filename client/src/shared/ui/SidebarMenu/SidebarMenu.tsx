import { memo } from "react";
import styled from "styled-components";
import { Menu } from "antd";

import { SearchFriend } from "../../../features/search-friend";
import { AddFriend } from "../../../features/add-friend";
import { CreateRoom } from "../../../features/create-room";

const StyledSidebarMenu = styled(Menu)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-inline-end: 0 !important;

    .ant-menu-item {
        background-color: transparent !important;
    }
`;

export const SidebarMenu = memo(() => (
    <StyledSidebarMenu
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
