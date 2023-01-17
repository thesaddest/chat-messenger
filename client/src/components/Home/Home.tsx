import { FC } from "react";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

import { useSocket } from "../../hooks/use-socket";
import { useAppSelector } from "../../hooks/redux-hooks";

import { Navbar } from "./Navbar";
import { Chat } from "./Chat";


const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Home: FC = () => {
    useSocket();

    const isFriendsLoading = useAppSelector((state) => state.friend.loading);

    return (
        <StyledContainer>
            <Navbar />
            {isFriendsLoading
                ? <StyledLoadingContainer><LoadingOutlined /></StyledLoadingContainer>
                : <Chat />}
        </StyledContainer>
    );
};
