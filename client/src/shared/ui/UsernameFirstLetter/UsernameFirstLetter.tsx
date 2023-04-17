import { memo } from "react";
import styled from "styled-components";

interface IUsernameFirstLetterProps {
    firstLetter: string;
}

const StyledFirstLetter = styled.p`
    font-size: 24px;
`;

export const UsernameFirstLetter = memo<IUsernameFirstLetterProps>(({ firstLetter }) => {
    return <StyledFirstLetter>{firstLetter}</StyledFirstLetter>;
});
