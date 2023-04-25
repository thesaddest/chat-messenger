import { useCallback, useState } from "react";
import styled from "styled-components";

import { AvatarUpload } from "./avatar-upload";
import { Avatar } from "./avatar";
import { IAvatarProps } from "./interfaces";

const StyledAvatarContainer = styled.div<{ isHover: boolean }>`
    cursor: ${({ isHover }) => (isHover ? "pointer" : "auto")};
`;

export const SidebarAvatar = ({ username, avatarPath }: IAvatarProps) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const onMouseEnter = useCallback(() => {
        setIsHover(true);
    }, []);

    const onSuccess = useCallback(() => {
        setIsHover(false);
    }, []);

    return (
        <StyledAvatarContainer onMouseEnter={onMouseEnter} isHover={isHover}>
            {isHover ? (
                <AvatarUpload username={username} onSuccess={onSuccess} />
            ) : (
                <Avatar username={username} avatarPath={avatarPath} />
            )}
        </StyledAvatarContainer>
    );
};
