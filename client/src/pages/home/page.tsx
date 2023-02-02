import { FC } from "react";
import styled from "styled-components";
import { Divider } from "antd";

import { useAppSelector } from "../../shared/lib/hooks";
import { Navbar } from "../../widgets/navbar";
import { Loader } from "../../shared/ui";
import { ChatTabsBox } from "../../widgets/chat";
import { useSocket } from "../../app/lib/hooks";

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

const StyledLoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
`;

export const HomePage: FC = () => {
    useSocket();

    const isFriendsLoading = useAppSelector((state) => state.friend.loading);

    return (
        <StyledHomeContainer>
            <StyledHome>
                <Navbar />
                <StyledDivider />
                {isFriendsLoading ? (
                    <StyledLoadingContainer>
                        <Loader />
                    </StyledLoadingContainer>
                ) : (
                    <ChatTabsBox />
                )}
            </StyledHome>
        </StyledHomeContainer>
    );
};
