import { FC, useState } from "react";
import styled from "styled-components";
import { Divider } from "antd";

import { useAppSelector, useWindowSize } from "../../shared/lib/hooks";
import { Navbar } from "../../widgets/navbar";
import { ChatTabsBox } from "../../widgets/chat";
import { useSocket } from "../../app/lib/hooks";
import { SkeletonChat } from "../../features/skeleton-chat";
import { SelectChatToStartMessaging } from "../../shared/ui";
import { COLORS, DEFAULT_ACTIVE_KEY, MAX_MOBILE_WIDTH_HOOK, SIZES } from "../../shared/const";

import { ChatType } from "./interfaces";

const StyledHomeContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: ${SIZES.MOBILE}) {
        overflow: hidden;
    }
`;

const StyledHome = styled.div`
    border: 1px solid ${COLORS.LIGHTGREY};
    border-radius: 10px;
    width: 65vw;
    height: 80vh;

    @media only screen and (max-width: ${SIZES.MOBILE}) {
        overflow: hidden;
        height: 100vh;
        width: 100vw;
    }
`;

const StyledDivider = styled(Divider)`
    margin: 0;
    background-color: ${COLORS.LIGHTGREY};
`;

export const HomePage: FC = () => {
    useSocket();
    const [chatType, setChatType] = useState<ChatType>(ChatType.FRIEND);
    const { width } = useWindowSize();

    const isFriendsLoading = useAppSelector((state) => state.friend.isLoading);
    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);
    const rooms = useAppSelector((state) => state.room.rooms);
    const roomIdActiveKey = useAppSelector((state) => state.room.roomIdActiveKey);
    const friends = useAppSelector((state) => state.friend.friends);

    return (
        <StyledHomeContainer>
            <StyledHome>
                {isFriendsLoading ? (
                    <SkeletonChat />
                ) : (
                    <>
                        <Navbar chatType={chatType} setChatType={setChatType} />
                        <StyledDivider />
                        {/*Check if IS NOT mobile and chat active keys ARE default = render SelectChatToStartMessaging */}
                        {width >= MAX_MOBILE_WIDTH_HOOK &&
                            friendIdActiveKey === DEFAULT_ACTIVE_KEY &&
                            roomIdActiveKey === DEFAULT_ACTIVE_KEY && <SelectChatToStartMessaging />}
                        {rooms.length > 0 && chatType === ChatType.ROOM ? (
                            <ChatTabsBox chats={rooms} />
                        ) : (
                            friends && <ChatTabsBox chats={friends} />
                        )}
                    </>
                )}
            </StyledHome>
        </StyledHomeContainer>
    );
};
