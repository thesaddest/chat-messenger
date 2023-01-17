import { Avatar, Tabs } from "antd";
import { FC, useState } from "react";
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
    const friends = useAppSelector((state) => state.friend.friends);
    const messages = useAppSelector((state) => state.message.messages);

    const [friendIndex, setFriendIndex] = useState<string>("1");

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
                            key: `${friend.userBehindFriend}`,
                            children: <Messages friend={friend} messages={messages} />,
                        };
                    })}
                    activeKey={`${friendIndex}`}
                    onChange={(activeKey) => setFriendIndex(activeKey)}
                />
                <ChatInputBox friendId={friendIndex} />
            </StyledContainer>
        </StyledWrapper>
    ) : (
        <StyledTabs tabPosition="left" items={DEFAULT_TAB_ITEM} />
    );
};
