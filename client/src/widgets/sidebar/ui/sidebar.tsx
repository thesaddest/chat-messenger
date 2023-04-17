import { memo } from "react";
import styled from "styled-components";

import { SidebarProfile } from "../../../features/sidebar-profile";
import { SidebarMenu } from "../../../shared/ui";

const StyledSidebarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
`;
export const Sidebar = memo(() => {
    return (
        <StyledSidebarContainer>
            <SidebarProfile />
            <SidebarMenu />
        </StyledSidebarContainer>
    );
});
