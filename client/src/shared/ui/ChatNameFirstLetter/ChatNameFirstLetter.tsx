import { memo, useMemo } from "react";
import styled from "styled-components";

interface IUsernameFirstLetterProps {
    username: string;
    size?: string;
}

const StyledFirstLetter = styled.p<{ size?: string }>`
    font-size: ${({ size }) => (size ? size : "24px")};
`;

export const ChatNameFirstLetter = memo<IUsernameFirstLetterProps>(({ username, size }) => {
    const firstLetter = useMemo(() => username.charAt(0).toUpperCase(), [username]);
    return <StyledFirstLetter size={size}>{firstLetter}</StyledFirstLetter>;
});
