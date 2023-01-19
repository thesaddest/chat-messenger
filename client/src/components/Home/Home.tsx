import { FC } from "react";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";
import { Divider } from "antd";

import { useSocket } from "../../hooks/use-socket";
import { useAppSelector } from "../../hooks/redux-hooks";

import { Navbar } from "./Navbar";
import { Chat } from "./Chat";

const StyledHome = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHomeContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 65vw;
  height: 80vh;
`;

const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;

const StyledDivider = styled(Divider)`
  margin: 0;
  background-color: lightgray;
`;

export const Home: FC = () => {
    useSocket();

    const isFriendsLoading = useAppSelector((state) => state.friend.loading);

    return (
        <StyledHome>
            <StyledHomeContainer>
                <Navbar />
                <StyledDivider />
                {isFriendsLoading
                    ? <StyledLoadingContainer>
                        <LoadingOutlined />
                    </StyledLoadingContainer>
                    : <Chat />
                }
            </StyledHomeContainer>
        </StyledHome>
    );
};
