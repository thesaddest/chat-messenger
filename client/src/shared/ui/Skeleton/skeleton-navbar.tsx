import { FC } from "react";
import { Skeleton } from "antd";
import styled from "styled-components";

const StyledNavbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
    padding: 0.5rem 0 0 0.5rem;
    width: 100%;

    @media only screen and (max-width: 425px) {
        justify-content: space-evenly;
    }
`;

const StyledButtonsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    padding-right: 2rem;

    @media only screen and (min-width: 1024px) {
        padding-left: 9rem;
    }
`;

const StyledInputContainer = styled.div`
    display: flex;
    padding-left: 3rem;
`;

export const SkeletonNavbar: FC = () => {
    return (
        <StyledNavbarContainer>
            <StyledInputContainer>
                <Skeleton.Input active size="default" style={{ height: "26px", minWidth: "10px", width: "70px" }} />
            </StyledInputContainer>
            <StyledButtonsContainer>
                <Skeleton.Button active style={{ minWidth: "42px", width: "46px", height: "32px" }} />
                <Skeleton.Button active style={{ minWidth: "42px", width: "46px", height: "32px" }} />
            </StyledButtonsContainer>
        </StyledNavbarContainer>
    );
};
