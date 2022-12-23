import { Avatar, Tabs } from "antd";
import { FC, useState } from "react";
import styled from "styled-components";
import { MinusCircleFilled, CheckCircleFilled } from "@ant-design/icons";

import { useAppSelector } from "../../../hooks/redux-hooks";
import { IFriend } from "../../../store/friend/friendSlice";

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

const StyledTabs = styled(Tabs)`A`;

export const Chat: FC = () => {
    const { friends } = useAppSelector((state) => state.friend);

    const [friendsList] = useState<IFriend[]>(friends);

    return friendsList.length > 0 ? (
        <StyledTabs
            tabPosition="left"
            items={friendsList.map((friend) => {
                return {
                    label: (
                        <StyledFriendsCardDiv>
                            {friend.connected ? (
                                <CheckCircleFilled style={{ color: "#66bfbf", marginRight: "0.25rem" }} />
                            ) : (
                                <MinusCircleFilled style={{ color: "#f76b8a", marginRight: "0.25rem" }} />
                            )}
                            <StyledAvatar />
                            {friend.username}
                        </StyledFriendsCardDiv>
                    ),
                    key: friend.id,
                    children: `Content ${friend.username}`,
                    style: { paddingTop: "0.9rem" },
                };
            })}
        />
    ) : (
        <StyledTabs tabPosition="left" items={DEFAULT_TAB_ITEM} />
    );
};
