import { Tabs } from "antd";
import styled from "styled-components";
import { memo } from "react";

import { DEFAULT_ACTIVE_KEY } from "../../../../shared/const";
import { RoomSidebarCard } from "../../../../features/room-sidebar-card";
import { useAppSelector } from "../../../../shared/lib/hooks";

import { RoomTabsContent } from "./room-tabs-content";

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

export const RoomTabsBox = memo(() => {
    const rooms = useAppSelector((state) => state.room.rooms);
    const messages = useAppSelector((state) => state.message.messages);

    return (
        <StyledChatBoxTabs
            tabPosition={"left"}
            items={rooms.map((room) => {
                return {
                    label: <RoomSidebarCard room={room} />,
                    key: room.roomId,
                    children: messages && <RoomTabsContent room={room} messages={messages} />,
                };
            })}
        />
    );
});
