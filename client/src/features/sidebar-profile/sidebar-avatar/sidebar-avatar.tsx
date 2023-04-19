import { memo, useCallback, useState } from "react";
import styled from "styled-components";

import { ChatNameFirstLetter, Edit, SharedAvatar } from "../../../shared/ui";

interface ISidebarAvatarProps {
    username: string;
}

const StyledAvatarContainer = styled.div<{ isHover: boolean }>`
    cursor: ${({ isHover }) => (isHover ? "pointer" : "auto")};
`;

export const SidebarAvatar = memo<ISidebarAvatarProps>(({ username }) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const onHover = useCallback(() => {
        setIsHover(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setIsHover(false);
    }, []);

    return (
        <StyledAvatarContainer onMouseEnter={onHover} isHover={isHover} onMouseLeave={onMouseLeave}>
            <SharedAvatar>
                {isHover ? <Edit fontSize={"22px"} /> : username && <ChatNameFirstLetter username={username} />}
            </SharedAvatar>
        </StyledAvatarContainer>
    );
});
