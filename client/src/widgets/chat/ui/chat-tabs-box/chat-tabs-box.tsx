import { Tabs } from "antd";
import { memo, useCallback, useState } from "react";
import styled from "styled-components";

import { getFriendsWithLimit, setFriendIdActiveKey } from "../../../../entities/friend";
import { DEFAULT_ACTIVE_KEY, DEFAULT_TAB_ITEM } from "../../../../shared/const";
import { FriendSidebarCard } from "../../../../features/friend-sidebar-card";
import { useAppDispatch, useAppSelector, useDebounce } from "../../../../shared/lib/hooks";
import { ScrollToSeeMore } from "../../../../shared/ui";

import { deselectAllSelectedMessages } from "../../../../entities/message";

import { ChatTabsContent } from "./chat-tabs-content";

//TODO: Remove scroll to top

interface ITabsSrcollDirection {
    direction: "left" | "right" | "top" | "bottom";
}

const StyledChatBoxTabs = styled(Tabs)`
    height: 75vh;

    .ant-tabs-nav {
        flex: 1;
        overflow: hidden;

        .ant-tabs-nav-operations {
            display: none;
        }

        .ant-tabs-ink-bar {
            display: none;
        }

        .ant-tabs-nav-wrap {
            overflow-y: scroll;
        }

        .ant-tabs-tab {
            padding: 0.5rem 0.75rem;

            .ant-tabs-tab-btn {
                display: flex;
                width: 100%;
                flex-direction: column;
            }

            @media only screen and(max-width: 768px) {
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

export const ChatTabsBox = memo(() => {
    const [isScroll, setIsScroll] = useState<boolean>(false);
    const messages = useAppSelector((state) => state.message.messages);
    const selectedMessages = useAppSelector((state) => state.message.selectedMessages);
    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);
    const friends = useAppSelector((state) => state.friend.friends);

    const dispatch = useAppDispatch();

    const onTabChange = useCallback(
        (activeKey: string) => {
            dispatch(setFriendIdActiveKey(activeKey));
            dispatch(deselectAllSelectedMessages(selectedMessages));
        },
        [selectedMessages, dispatch],
    );

    const scrollHandler = useDebounce((e: ITabsSrcollDirection) => {
        if (e.direction === "bottom" && friends) {
            setIsScroll(true);
            dispatch(getFriendsWithLimit({ skip: friends.length }));
        }
    }, 1000);

    return friends && friends.length > 0 ? (
        <StyledChatBoxTabs
            onTabScroll={scrollHandler}
            tabPosition="left"
            items={friends.map((friend) => {
                return {
                    label: messages && <FriendSidebarCard friend={friend} messages={messages} />,
                    key: `${friend.userBehindFriend}`,
                    children: messages && <ChatTabsContent messages={messages} friend={friend} />,
                };
            })}
            activeKey={friendIdActiveKey}
            onChange={onTabChange}
            tabBarExtraContent={!isScroll && friends.length > 8 && <ScrollToSeeMore />}
        />
    ) : (
        <StyledChatBoxTabs tabPosition="left" items={DEFAULT_TAB_ITEM} />
    );
});
