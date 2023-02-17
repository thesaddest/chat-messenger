import { FC, useCallback } from "react";
import styled from "styled-components";

import { useWindowSize } from "../../../shared/lib/hooks";
import { MemoTitle, ZeroPaddingButton, ArrowLeft } from "../../../shared/ui";
import { DEFAULT_ACTIVE_KEY } from "../../../shared/const";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { setFriendIdActiveKey } from "../../../entities/friend";
import { AddFriend } from "../../../features/add-friend";
import { SearchFriend } from "../../../features/search-friend";
import { DeleteMessages } from "../../../features/delete-messages";
import { ForwardMessages } from "../../../features/forward-messages";
import { deselectAllSelectedMessages } from "../../../entities/message";
import { ReplyToMessage } from "../../../features/reply-to-message";

interface IStyledLeftDivProps {
    friendIdActiveKey: string;
}

const StyledRightDiv = styled.div`
    display: flex;
    flex: 2;
    justify-content: end;
    padding-right: 1rem;

    @media only screen and (max-width: 425px) {
        padding-right: 0.25rem;
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
    const selectedMessages = useAppSelector((state) => state.message.selectedMessages);

    const onClick = useCallback(() => {
        dispatch(setFriendIdActiveKey(DEFAULT_ACTIVE_KEY));
        dispatch(deselectAllSelectedMessages(selectedMessages));
    }, [dispatch, selectedMessages]);

    return (
        <StyledHeader>
            <StyledLeftDiv friendIdActiveKey={friendIdActiveKey}>
                {width >= 426 || friendIdActiveKey === DEFAULT_ACTIVE_KEY ? (
                    <>
                        <MemoTitle title="Chat" />
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
            <StyledRightDiv>
                {selectedMessages.length > 0 && <ForwardMessages selectedMessages={selectedMessages} />}
                {selectedMessages.length === 1 && <ReplyToMessage selectedMessage={selectedMessages[0]} />}
                {selectedMessages.length > 0 && <DeleteMessages selectedMessages={selectedMessages} />}
            </StyledRightDiv>
        </StyledHeader>
    );
};
