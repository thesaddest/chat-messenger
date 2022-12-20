import { FC } from "react";
import styled from "styled-components";

import { Chat } from "./Chat";
import { Sidebar } from "./Sidebar";

const StyledContainer = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const Home: FC = () => {
    return (
        <StyledContainer>
            <Sidebar />
            <Chat />
        </StyledContainer>
    );
};
