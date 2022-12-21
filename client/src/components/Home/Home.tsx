import { FC } from "react";
import styled from "styled-components";

import { Navbar } from "./Navbar";

import { Chat } from "./Chat";

const StyledContainer = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const Home: FC = () => {
    return (
        <StyledContainer>
            <Navbar />
            <Chat />
        </StyledContainer>
    );
};
