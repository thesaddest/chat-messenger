import { FC } from "react";
import styled from "styled-components";
import { Divider } from "antd";

import { useAppSelector } from "../../shared/lib/hooks";
import { useSocket } from "../../shared/lib/hooks";
import { Navbar } from "../../widgets/navbar";
import { ChatBox } from "../../widgets/chat";
import { Loader } from "../../shared/ui";

const StyledHomeContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 425px) {
    overflow: hidden;
  }
`;

const StyledHome = styled.div`
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 65vw;
  height: 80vh;

  @media only screen and (max-width: 425px) {
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 0;
  background-color: lightgray;
`;

export const HomePage: FC = () => {
    useSocket();

    const isFriendsLoading = useAppSelector((state) => state.friend.loading);

    return (
        <StyledHomeContainer>
            <StyledHome>
                <Navbar />
                <StyledDivider />
                {isFriendsLoading ?
                    <Loader />
                    : <ChatBox />
                }
            </StyledHome>
        </StyledHomeContainer>
    );
};
