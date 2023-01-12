import { Avatar, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { MinusCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

import { useAppSelector } from "../../../hooks/redux-hooks";

import { ChatInputBox } from "./ChatInput/ChatInputBox";
import { DEFAULT_TAB_ITEM } from "./chat.constants";
import { Messages } from "./Messages/Messages";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 90vw;
  height: 90vh;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledAvatar = styled(Avatar)`
  width: 36px;
  height: 36px;
  line-height: 12px;
  margin-right: 12px;
`;

const StyledFriendsCardDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTabs = styled(Tabs)`
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  //TODO: Find solution to overwrite antd styles without !important
  .ant-tabs-tab {
    .anticon {
      margin-right: 0.2rem;
    }

    @media only screen and (max-width: 425px) {
      padding: 0 0.5rem !important;
    }
  }

  .ant-tabs-content {
    width: 85%;

    @media only screen and (max-width: 425px) {
      width: 100%;
    }
  }

  .ant-tabs-ink-bar {
    @media only screen and (max-width: 425px) {
      height: 35px !important;
    }
  }
`;

export const Chat: FC = () => {
    const { friends } = useAppSelector((state) => state.friend);
    console.log("friends: ", friends);
    const { messages } = useAppSelector((state) => state.message);
    console.log("messages: ", messages);

    //TODO: get friend's socketId from redis with help of this index
    const [friendIndex, setFriendIndex] = useState<string | null>(null);

    useEffect(() => {
        if (friends.length > 0) {
            setFriendIndex(friends[0].id);
        }
    }, [friends]);

    return friends.length > 0 ? (
        <StyledWrapper>
            <StyledContainer>
                <StyledTabs
                    tabPosition="left"
                    items={friends?.map((friend) => {
                        return {
                            label: (
                                <StyledFriendsCardDiv>
                                    {friend.connected ? <CheckCircleOutlined style={{ color: "#52c41a" }} /> :
                                        <MinusCircleOutlined style={{ color: "#eb2f96" }} />}
                                    <StyledAvatar /> {friend.username}
                                </StyledFriendsCardDiv>
                            ),
                            key: friend.id,
                            children: <Messages friend={friend} messages={messages} />,
                        };
                    })}
                    defaultActiveKey={friendIndex ? friendIndex : undefined}
                    onChange={(activeKey) => setFriendIndex(activeKey)}
                />
                <ChatInputBox friendId={friendIndex} />
            </StyledContainer>
        </StyledWrapper>


    ) : (
        <StyledTabs tabPosition="left" items={DEFAULT_TAB_ITEM} />
    );
};
