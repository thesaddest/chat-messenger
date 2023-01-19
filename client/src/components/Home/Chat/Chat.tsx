import { Tabs } from "antd";
import { FC, useState } from "react";
import styled from "styled-components";

import { useAppSelector } from "../../../hooks/redux-hooks";

import { DEFAULT_TAB_ITEM } from "./chat.constants";
import { Messages } from "./Messages/Messages";
import { FriendSidebarCard } from "./FriendSidebarCard/FriendSidebarCard";

const StyledTabs = styled(Tabs)`
  height: 75vh;

  .ant-tabs-nav {
    flex: 1;

    .ant-tabs-tab-active {
      transition: all 0s;
      border: 1px solid #1677ff;
      background-color: #1677ff;

      .ant-tabs-tab-btn {
        color: whitesmoke;
      }
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
  }

`;

export const Chat: FC = () => {
    const friends = useAppSelector((state) => state.friend.friends);
    const messages = useAppSelector((state) => state.message.messages);

    const [friendIndex, setFriendIndex] = useState<string>("1");

    return friends.length > 0 ? (
        <>
            <StyledTabs tabPosition="left"
                        items={friends?.map((friend) => {
                            return {
                                label: <FriendSidebarCard friend={friend} />,
                                key: `${friend.userBehindFriend}`,
                                children: <Messages friend={friend} messages={messages} />,
                            };
                        })}
                        activeKey={`${friendIndex}`}
                        onChange={(activeKey) => setFriendIndex(activeKey)}>
            </StyledTabs>
        </>
    ) : (
        <StyledTabs tabPosition="left" items={DEFAULT_TAB_ITEM} />
    );
};
