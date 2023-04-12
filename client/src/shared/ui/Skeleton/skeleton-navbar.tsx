import { FC } from "react";
import { Skeleton } from "antd";
import styled from "styled-components";

import { SIZES } from "../../const";

const StyledNavbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    width: 100%;
`;

const StyledButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-right: 1rem;
`;

const StyledInputContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    padding-left: 1rem;

    @media only screen and (max-width: ${SIZES.MOBILE}) {
        padding-right: 1.5rem;
    }
`;

export const SkeletonNavbar: FC = () => {
    return (
        <StyledNavbarContainer>
            <StyledInputContainer>
                <Skeleton.Button active size="default" style={{ minWidth: "42px", width: "42px" }} />
            </StyledInputContainer>
            <StyledButtonsContainer>
                <Skeleton.Button active style={{ minWidth: "42px", width: "42px", height: "24px" }} />
                <Skeleton.Button shape={"circle"} active style={{ minWidth: "32px", width: "32px" }} />
            </StyledButtonsContainer>
        </StyledNavbarContainer>
    );
};
