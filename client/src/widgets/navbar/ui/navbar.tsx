import { FC, useCallback } from "react";
import styled from "styled-components";

import { useWindowSize } from "../../../shared/lib/hooks";
import { MemoTitle, ZeroPaddingButton, ArrowLeft } from "../../../shared/ui";
import { DEFAULT_ACTIVE_KEY } from "../../../shared/const";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { setFriendIdActiveKey } from "../../../entities/friend";
import { AddFriend } from "../../../features/add-friend";
import { SearchFriend } from "../../../features/search-friend";

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
    justify-content: space-around;
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

const StyledModalButtonsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const Navbar: FC = () => {
    const { width } = useWindowSize();
    const dispatch = useAppDispatch();
    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);

    const onClick = useCallback(() => {
        dispatch(setFriendIdActiveKey(DEFAULT_ACTIVE_KEY));
    }, [dispatch]);

    return (
        <StyledHeader>
            <StyledLeftDiv friendIdActiveKey={friendIdActiveKey}>
                {width >= 426 || friendIdActiveKey === DEFAULT_ACTIVE_KEY ? (
                    <>
                        <MemoTitle />
                        <StyledModalButtonsContainer>
                            <AddFriend />
                            <SearchFriend />
                        </StyledModalButtonsContainer>
                    </>
                ) : (
                    <ZeroPaddingButton icon={<ArrowLeft />} type="link" onClick={onClick}>
                        Back
                    </ZeroPaddingButton>
                )}
            </StyledLeftDiv>
            <StyledRightDiv />
        </StyledHeader>
    );
};
