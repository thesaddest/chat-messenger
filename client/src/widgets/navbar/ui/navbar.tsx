import styled from "styled-components";
import { LeftOutlined } from "@ant-design/icons";

import { useWindowSize } from "../../../shared/lib/hooks";
import { ZeroPaddingButton } from "../../../shared/ui";
import { DEFAULT_ACTIVE_KEY } from "../../../shared/const";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { setFriendIdActiveKey } from "../../../entities/friend";
import { AddFriend } from "../../../features/add-friend";

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
        justify-content: ${(props) => (props.friendIdActiveKey === DEFAULT_ACTIVE_KEY ? "space-evenly" : "start")};
        flex: 3;
    }
`;

const StyledHeader = styled.header`
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
export const Navbar = () => {
    const { width } = useWindowSize();
    const dispatch = useAppDispatch();
    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);

    const onClick = () => {
        dispatch(setFriendIdActiveKey(DEFAULT_ACTIVE_KEY));
    };

    return (
        <StyledHeader>
            <StyledLeftDiv friendIdActiveKey={friendIdActiveKey}>
                {width >= 426 || friendIdActiveKey === DEFAULT_ACTIVE_KEY ? (
                    <AddFriend />
                ) : (
                    <ZeroPaddingButton icon={<LeftOutlined />} type="link" onClick={onClick}>
                        Back
                    </ZeroPaddingButton>
                )}
            </StyledLeftDiv>
            <StyledRightDiv />
        </StyledHeader>
    );
};
