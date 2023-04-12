import { Dispatch, FC, SetStateAction, useCallback } from "react";
import styled from "styled-components";

import { useWindowSize } from "../../../shared/lib/hooks";
import { CancelButton, BackButton } from "../../../shared/ui";
import { DEFAULT_ACTIVE_KEY, MAX_MOBILE_WIDTH_HOOK, SIZES } from "../../../shared/const";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { setFriendIdActiveKey } from "../../../entities/friend";
import { deselectAllSelectedMessages, IMessage } from "../../../entities/message";
import { ForwardMessages } from "../../../features/forward-messages";
import { DeleteMessages } from "../../../features/delete-messages";
import { ChatSwitch } from "../../chat-switch";
import { setRoomIdActiveKey } from "../../../entities/room";
import { Notification } from "../../../features/notification";
import { ChatType } from "../../../pages/home";

import { BurgerMenu } from "./burger-menu";

interface IStyledDivProps {
    selectedMessages: IMessage[];
}

interface INavbarProps {
    chatType: ChatType;
    setChatType: Dispatch<SetStateAction<ChatType>>;
}

const StyledRightDiv = styled.div<IStyledDivProps>`
    display: ${({ selectedMessages }) => (selectedMessages.length > 0 ? "flex" : "none")};
    justify-content: space-between;
    padding: 0 1rem 0 1rem;

    @media only screen and (max-width: ${SIZES.MOBILE}) {
        width: 100%;
    }
`;

const StyledLeftDiv = styled.div<IStyledDivProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 1rem 0 1rem;

    @media only screen and (max-width: ${SIZES.MOBILE}) {
        display: ${({ selectedMessages }) => (selectedMessages.length > 0 ? "none" : "flex")};
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

    @media only screen and (max-width: ${SIZES.TABLET}) {
        h4 {
            font-size: 18px;
            word-break: normal;
        }
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

const StyledNavbarMenuContainer = styled.div<IStyledDivProps>`
    display: ${({ selectedMessages }) => (selectedMessages.length > 0 ? "none" : "flex")};
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const StyledNotificationSwitchHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 0.5rem;
`;

export const Navbar: FC<INavbarProps> = ({ chatType, setChatType }) => {
    const { width } = useWindowSize();
    const dispatch = useAppDispatch();
    const friendIdActiveKey = useAppSelector((state) => state.friend.friendIdActiveKey);
    const roomIdActiveKey = useAppSelector((state) => state.room.roomIdActiveKey);
    const selectedMessages = useAppSelector((state) => state.message.selectedMessages);
    const rooms = useAppSelector((state) => state.room.rooms);

    const onBackButtonClick = useCallback(() => {
        dispatch(setRoomIdActiveKey(DEFAULT_ACTIVE_KEY));
        dispatch(setFriendIdActiveKey(DEFAULT_ACTIVE_KEY));
        dispatch(deselectAllSelectedMessages(selectedMessages));
    }, [dispatch, selectedMessages]);

    return (
        <StyledHeader>
            <StyledLeftDiv selectedMessages={selectedMessages}>
                {width >= MAX_MOBILE_WIDTH_HOOK ||
                (friendIdActiveKey === DEFAULT_ACTIVE_KEY && roomIdActiveKey === DEFAULT_ACTIVE_KEY) ? (
                    <StyledNavbarMenuContainer selectedMessages={selectedMessages}>
                        <BurgerMenu />
                        <StyledNotificationSwitchHolder>
                            {rooms.length > 0 && <ChatSwitch chatType={chatType} setChatType={setChatType} />}
                            <Notification />
                        </StyledNotificationSwitchHolder>
                    </StyledNavbarMenuContainer>
                ) : (
                    selectedMessages.length === 0 && <BackButton onClick={onBackButtonClick} />
                )}
            </StyledLeftDiv>
            <StyledRightDiv selectedMessages={selectedMessages}>
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
