import { Dispatch, FC, SetStateAction, useCallback } from "react";
import styled from "styled-components";

import { useWindowSize } from "../../../shared/lib/hooks";
import { CancelButton, BackButton } from "../../../shared/ui";
import { DEFAULT_ACTIVE_KEY } from "../../../shared/const";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { setFriendIdActiveKey } from "../../../entities/friend";
import { AddFriend } from "../../../features/add-friend";
import { SearchFriend } from "../../../features/search-friend";
import { deselectAllSelectedMessages, IMessage } from "../../../entities/message";
import { ForwardMessages } from "../../../features/forward-messages";
import { DeleteMessages } from "../../../features/delete-messages";
import { CreateRoom } from "../../../features/create-room";
import { ChatSwitch } from "../../chat-switch";
import { setRoomIdActiveKey } from "../../../entities/room";
import { Notification } from "../../../features/notification";

interface IStyledLeftDivProps {
    friendIdActiveKey: string;
    roomIdActiveKey: string;
    selectedMessages: IMessage[];
}

interface INavbarProps {
    isSwitched: boolean;
    setIsSwitched: Dispatch<SetStateAction<boolean>>;
}

const StyledRightDiv = styled.div`
    display: flex;
    flex: 2;
    justify-content: space-between;
    padding: 0 1rem 0 1rem;

    @media only screen and (max-width: 425px) {
        width: 100%;
        flex: 0;
    }
`;

const StyledLeftDiv = styled.div<IStyledLeftDivProps>`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;

    @media only screen and (max-width: 425px) {
        display: ${({ selectedMessages }) => (selectedMessages.length > 0 ? "none" : "flex")};
        justify-content: ${({ friendIdActiveKey, roomIdActiveKey }) =>
            friendIdActiveKey === DEFAULT_ACTIVE_KEY && roomIdActiveKey === DEFAULT_ACTIVE_KEY
                ? "space-evenly"
                : "start"};
        flex: 3;
        padding-left: 0.5rem;

        .ant-btn > .anticon + span {
            margin-inline-start: 0;
        }
    }
`;

const StyledHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh;
    width: 100%;

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

    @media only screen and (max-width: 768px) {
        padding-left: 0.5rem;
    }
`;

const StyledForwardDeleteContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: start;
`;

const StyledCancelContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: end;
`;

export const Navbar: FC<INavbarProps> = ({ isSwitched, setIsSwitched }) => {
    const { width } = useWindowSize();
    const dispatch = useAppDispatch();
    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);
    const roomIdActiveKey = useAppSelector((state) => state.room.roomIdActiveKey);
    const selectedMessages = useAppSelector((state) => state.message.selectedMessages);
    const rooms = useAppSelector((state) => state.room.rooms);

    const onClick = useCallback(() => {
        dispatch(setRoomIdActiveKey(DEFAULT_ACTIVE_KEY));
        dispatch(setFriendIdActiveKey(DEFAULT_ACTIVE_KEY));
        dispatch(deselectAllSelectedMessages(selectedMessages));
    }, [dispatch, selectedMessages]);

    return (
        <StyledHeader>
            <StyledLeftDiv
                friendIdActiveKey={friendIdActiveKey}
                roomIdActiveKey={roomIdActiveKey}
                selectedMessages={selectedMessages}
            >
                {width >= 426 ||
                (friendIdActiveKey === DEFAULT_ACTIVE_KEY && roomIdActiveKey === DEFAULT_ACTIVE_KEY) ? (
                    <>
                        <StyledModalButtonsContainer>
                            {rooms.length > 0 && <ChatSwitch isSwitched={isSwitched} setIsSwitched={setIsSwitched} />}
                            <AddFriend />
                            <CreateRoom />
                            <SearchFriend />
                            <Notification />
                        </StyledModalButtonsContainer>
                    </>
                ) : (
                    selectedMessages.length === 0 && <BackButton onClick={onClick} />
                )}
            </StyledLeftDiv>
            <StyledRightDiv>
                <StyledForwardDeleteContainer>
                    {selectedMessages.length > 0 && <ForwardMessages selectedMessages={selectedMessages} />}
                    {selectedMessages.length > 0 && <DeleteMessages selectedMessages={selectedMessages} />}
                </StyledForwardDeleteContainer>
                <StyledCancelContainer>
                    {selectedMessages.length > 0 && <CancelButton selectedMessages={selectedMessages} />}
                </StyledCancelContainer>
            </StyledRightDiv>
        </StyledHeader>
    );
};
