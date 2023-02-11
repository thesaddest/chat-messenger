import { FC } from "react";
import styled from "styled-components";
import { Divider } from "antd";

import { useAppSelector, useWindowSize } from "../../shared/lib/hooks";
import { Navbar } from "../../widgets/navbar";
import { ChatTabsBox } from "../../widgets/chat";
import { useSocket } from "../../app/lib/hooks";
import { SkeletonChat } from "../../features/skeleton-chat";
import { SelectChatToStartMessaging } from "../../shared/ui";
import { DEFAULT_ACTIVE_KEY } from "../../shared/const";

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
    const { width } = useWindowSize();

    const isFriendsLoading = useAppSelector((state) => state.friend.isLoading);
    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);

    return (
        <StyledHomeContainer>
            <StyledHome>
                {isFriendsLoading ? (
                    <SkeletonChat />
                ) : (
                    <>
                        <Navbar />
                        <StyledDivider />
                        {width >= 426 && friendIdActiveKey === DEFAULT_ACTIVE_KEY && <SelectChatToStartMessaging />}
                        <ChatTabsBox />
                    </>
                )}
            </StyledHome>
        </StyledHomeContainer>
    );
};
