import { Tabs } from "antd";
import { FC } from "react";
import styled from "styled-components";

import { setFriendIdActiveKey } from "../../../../entities/friend";
import { DEFAULT_ACTIVE_KEY, DEFAULT_TAB_ITEM } from "../../../../shared/const";
import { FriendSidebarCard } from "../../../../features/friend-sidebar-card";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks";

import { ChatTabsContent } from "./chat-tabs-content";

const StyledChatBoxTabs = styled(Tabs)`
    height: 75vh;

    .ant-tabs-nav {
        flex: 1;

        .ant-tabs-tab {
            @media only screen and (max-width: 768px) {
                padding-left: 0.2rem;
            }
        }

        .ant-tabs-tab-active {
            border: 1px solid #1677ff;
            background-color: #1677ff;

            .ant-tabs-tab-btn {
                color: whitesmoke;
            }
        }

        @media only screen and (max-width: 425px) {
            display: ${(props) => (props.activeKey === DEFAULT_ACTIVE_KEY ? "flex" : "none")};
        }
    }

    .ant-tabs-tabpane {
        padding-left: 0;
    }

    .ant-tabs-content-holder {
        flex: 2;

        .ant-tabs-content {
            height: 100%;

            .ant-tabs-tabpane {
                padding-left: 0;
                height: 100%;
            }
        }

        @media only screen and (max-width: 425px) {
            display: ${(props) => (props.activeKey === DEFAULT_ACTIVE_KEY ? "none" : "flex")};
        }
    }

    @media only screen and (max-width: 425px) {
        height: 95vh;
    }
`;

export const ChatBoxTabs: FC = () => {
    const friends = useAppSelector((state) => state.friend.friends);
    const messages = useAppSelector((state) => state.message.messages);
    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);

    const dispatch = useAppDispatch();

    const onTabChange = (activeKey: string) => {
        dispatch(setFriendIdActiveKey(activeKey));
    };

    return friends && friends.length > 0 ? (
        <StyledChatBoxTabs
            tabPosition="left"
            items={friends?.map((friend) => {
                return {
                    label: <FriendSidebarCard friend={friend} />,
                    key: `${friend.userBehindFriend}`,
                    children: messages && <ChatTabsContent friend={friend} messages={messages} />,
                };
            })}
            activeKey={friendIdActiveKey}
            onChange={onTabChange}
        />
    ) : (
        <StyledChatBoxTabs tabPosition="left" items={DEFAULT_TAB_ITEM} />
    );
};
