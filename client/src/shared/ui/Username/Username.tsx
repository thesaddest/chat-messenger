import { memo, ReactNode } from "react";
import styled from "styled-components";

import { COLORS, SIZES } from "../../const";

interface IUsername {
    children?: ReactNode;
    color?: string;
}

const StyledUsername = styled.p<{ color?: string }>`
    font-size: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${({ color }) => (color ? color : COLORS.MAIN_BLACK)};

    @media only screen and (max-width: ${SIZES.TABLET}) {
        font-size: 16px;
    }

    @media only screen and (max-width: ${SIZES.MOBILE}) {
        font-size: 18px;
    }
`;
export const Username = memo<IUsername>(({ children, color }) => {
    return <StyledUsername color={color}>{children}</StyledUsername>;
});
