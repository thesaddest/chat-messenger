import { Avatar, Tabs } from "antd";
import { FC } from "react";
import styled from "styled-components";

import { useAppSelector } from "../../../hooks/redux-hooks";

const DEFAULT_TAB_ITEM = [
    { label: "No friends", key: "1", children: "Add some frineds :)", style: { paddingTop: "0.5rem" } },
];

const StyledAvatar = styled(Avatar)`
    width: 36px;
    height: 36px;
    line-height: 12px;
    margin-right: 12px;
`;

const StyledFriendsCardDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const StyledTabs = styled(Tabs)`
    height: 100%;

    .ant-tabs-content-holder {
    }
`;

export const Chat: FC = () => {
    const { friends } = useAppSelector((state) => state.friend);
    console.log("friends: ", friends);
    const { messages } = useAppSelector((state) => state.message);
    console.log("messages: ", messages);

    //TODO: Change friend.username to online/offline status
    return friends.length > 0 ? (
        <StyledTabs
            tabPosition="left"
            items={friends?.map((friend, index) => {
                return {
                    label: (
                        <StyledFriendsCardDiv>
                            <StyledAvatar /> {friend.username}
                        </StyledFriendsCardDiv>
                    ),
                    key: friend.id,
                    children: `Content ${messages[index].content}`,
                    style: { paddingTop: "0.9rem" },
                };
            })}
        />
    ) : (
        <StyledTabs tabPosition="left" items={DEFAULT_TAB_ITEM} />
    );
};
