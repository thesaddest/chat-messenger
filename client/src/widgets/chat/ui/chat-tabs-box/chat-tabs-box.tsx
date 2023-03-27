import { Tabs } from "antd";
import { FC, useCallback, useState } from "react";
import styled from "styled-components";

import { getFriendsWithLimit, IFriend, setFriendIdActiveKey } from "../../../../entities/friend";
import { COLORS, DEFAULT_ACTIVE_KEY, DEFAULT_TAB_ITEM, SIZES } from "../../../../shared/const";
import { useAppDispatch, useAppSelector, useDebounce } from "../../../../shared/lib/hooks";
import { deselectAllSelectedMessages, deselectMessageToReply } from "../../../../entities/message";
import { IRoom, isChatsAreRoom, setRoomIdActiveKey } from "../../../../entities/room";
import { ChatSidebarCard } from "../../../../features/chat-sidebar-card";
import { ScrollToSeeMore } from "../../../../shared/ui";

import { ChatTabsContent } from "./chat-tabs-content";

//TODO: Remove scroll to top

interface ITabsSrcollDirection {
    direction: "left" | "right" | "top" | "bottom";
}

interface IChatTabsBoxProps {
    chats: IFriend[] | IRoom[];
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

        .ant-tabs-tab {
            padding: 0.5rem 0.75rem;

            .ant-tabs-tab-btn {
                display: flex;
                width: 100%;
                flex-direction: column;
            }

            @media only screen and(max-width: ${SIZES.TABLET}) {
                padding-left: 0.2rem;
            }
        }

        .ant-tabs-tab-active {
            border: 1px solid ${COLORS.MAIN_BLUE};
            background-color: ${COLORS.MAIN_BLUE};

            .ant-tabs-tab-btn {
                color: ${COLORS.MAIN_WHITE};
            }
        }

        @media only screen and (max-width: ${SIZES.MOBILE}) {
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

        @media only screen and (max-width: ${SIZES.MOBILE}) {
            display: ${(props) => (props.activeKey === DEFAULT_ACTIVE_KEY ? "none" : "flex")};
        }
    }

    @media only screen and (max-width: ${SIZES.MOBILE}) {
        height: 95vh;
    }
`;

export const ChatTabsBox: FC<IChatTabsBoxProps> = ({ chats }) => {
    const [isScroll, setIsScroll] = useState<boolean>(false);
    const messages = useAppSelector((state) => state.message.messages);
    const selectedMessages = useAppSelector((state) => state.message.selectedMessages);
    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);
    const roomIdActiveKey = useAppSelector((state) => state.room.roomIdActiveKey);

    const dispatch = useAppDispatch();

    const onTabChange = useCallback(
        (activeKey: string, chats: IRoom[] | IFriend[]) => {
            const setActiveKey = isChatsAreRoom(chats) ? setRoomIdActiveKey : setFriendIdActiveKey;

            const clearSelectedMessages = () => {
                dispatch(deselectAllSelectedMessages(selectedMessages));
                dispatch(deselectMessageToReply());
            };

            dispatch(setActiveKey(activeKey));
            clearSelectedMessages();
        },
        [dispatch, selectedMessages],
    );

    const scrollHandler = useDebounce((e: ITabsSrcollDirection) => {
        if (e.direction === "bottom" && chats) {
            setIsScroll(true);
            dispatch(getFriendsWithLimit({ skip: chats.length }));
        }
    }, 1000);

    if (isChatsAreRoom(chats)) {
        return chats.length > 0 ? (
            <StyledChatBoxTabs
                onTabScroll={scrollHandler}
                tabPosition="left"
                items={chats.map((chat) => {
                    return {
                        label: messages && <ChatSidebarCard chat={chat} messages={messages} />,
                        key: chat.roomId,
                        children: messages && <ChatTabsContent messages={messages} chat={chat} />,
                    };
                })}
                activeKey={roomIdActiveKey}
                onChange={(activeKey) => onTabChange(activeKey, chats)}
                tabBarExtraContent={!isScroll && chats.length > 8 && <ScrollToSeeMore />}
            />
        ) : (
            <StyledChatBoxTabs tabPosition="left" items={DEFAULT_TAB_ITEM} />
        );
    } else {
        return chats.length > 0 ? (
            <StyledChatBoxTabs
                onTabScroll={scrollHandler}
                tabPosition="left"
                items={chats.map((chat) => {
                    return {
                        label: messages && <ChatSidebarCard chat={chat} messages={messages} />,
                        key: chat.userBehindFriend,
                        children: messages && <ChatTabsContent messages={messages} chat={chat} />,
                    };
                })}
                activeKey={friendIdActiveKey}
                onChange={(activeKey) => onTabChange(activeKey, chats)}
                tabBarExtraContent={!isScroll && chats.length > 8 && <ScrollToSeeMore />}
            />
        ) : (
            <StyledChatBoxTabs tabPosition="left" items={DEFAULT_TAB_ITEM} />
        );
    }
};
