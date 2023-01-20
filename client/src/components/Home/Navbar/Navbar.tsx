import { FC } from "react";
import styled from "styled-components";
import { LeftOutlined } from "@ant-design/icons";

import { useWindowSize } from "../../../hooks/useWindowSize";
import { StyledZeroPaddingButton } from "../../Button/StyledZeroPaddingButton";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { setFriendIdActiveKey } from "../../../store/friend/friendSlice";
import { DEFAULT_ACTIVE_KEY } from "../Chat/chat.constants";

import { AddFriend } from "./AddFriend";

interface IStyledLeftDivProps {
    friendIdActiveKey: string;
}

const StyledRightDiv = styled.div`
  display: flex;
  flex: 2;

  @media only screen and (max-width: 425px) {
    flex: 0;
  }
`;

const StyledLeftDiv = styled.div<IStyledLeftDivProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;

  @media only screen and (max-width: 425px) {
    display: flex;
    justify-content: ${props => props.friendIdActiveKey === DEFAULT_ACTIVE_KEY ? "space-evenly" : "start"};
    flex: 3;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;

  h4 {
    margin: 0;
  }

  @media only screen and (max-width: 768px) {
    h4 {
      font-size: 18px;
      word-break: normal;
    }
  }
`;


export const Navbar: FC = () => {
    const { width } = useWindowSize();
    const dispatch = useAppDispatch();
    const friendIdActiveKey = useAppSelector(state => state.friend.friendIdActiveKey);

    const onClick = () => {
        dispatch(setFriendIdActiveKey(DEFAULT_ACTIVE_KEY));
    };

    return (
        <StyledContainer>
            <StyledLeftDiv friendIdActiveKey={friendIdActiveKey}>
                {(width >= 426 || friendIdActiveKey === DEFAULT_ACTIVE_KEY) ? <AddFriend /> :
                    <StyledZeroPaddingButton
                        icon={<LeftOutlined />}
                        type="link"
                        onClick={onClick}
                    >
                        Back
                    </StyledZeroPaddingButton>
                }
            </StyledLeftDiv>
            <StyledRightDiv />
        </StyledContainer>
    );
};
