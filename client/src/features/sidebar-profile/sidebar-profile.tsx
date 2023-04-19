import { memo } from "react";
import styled from "styled-components";

import { useAppSelector } from "../../shared/lib/hooks";
import { Username } from "../../shared/ui";

import { SidebarAvatar } from "./sidebar-avatar";

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    padding-left: 1rem;
    margin-left: 0.25rem;
`;

const StyledUsernameContainer = styled.div`
    padding: 0.5rem 0 0.5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SidebarProfile = memo(() => {
    const username = useAppSelector((state) => state.auth.user?.username);

    return (
        <StyledContainer>
            {username && <SidebarAvatar username={username} />}
            <StyledUsernameContainer>
                <Username>{username}</Username>
            </StyledUsernameContainer>
        </StyledContainer>
    );
});
