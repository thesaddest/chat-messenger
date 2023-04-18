import { memo, ReactNode } from "react";
import styled from "styled-components";

import { SIZES } from "../../const";

interface IUsername {
    children?: ReactNode;
    color?: string;
    size?: string;
}

const StyledUsername = styled.p<{ color?: string }>`
    font-size: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    @media only screen and (max-width: ${SIZES.TABLET}) {
        font-size: 16px;
    }

    @media only screen and (max-width: ${SIZES.MOBILE}) {
        font-size: 18px;
    }
`;

export const Username = memo<IUsername>(({ children, color, size }) => {
    return <StyledUsername color={color}>{children}</StyledUsername>;
});
