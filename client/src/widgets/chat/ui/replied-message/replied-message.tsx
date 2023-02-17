import { FC, useCallback } from "react";
import styled from "styled-components";
import { Button } from "antd";

import { clearReplyToMessage, IMessage } from "../../../../entities/message";
import { IFriend } from "../../../../entities/friend";
import { Close, Reply } from "../../../../shared/ui";
import { useAppDispatch } from "../../../../shared/lib/hooks";

interface IRepliedMessageProps {
    repliedMessage: IMessage;
    friend: IFriend;
}

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh;
`;

const StyledContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background: white;
`;

const StyledButton = styled(Button)`
    border: 0;
    padding: 0.25rem;
    background: white;
`;

const StyledUsernameMessageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;

    p {
        font-size: 16px;
        font-weight: 600;
        color: #1677ff;
    }
`;

const StyledReplyContainer = styled.div`
    padding-left: 0.25rem;
`;

export const RepliedMessage: FC<IRepliedMessageProps> = ({ repliedMessage, friend }) => {
    const dispatch = useAppDispatch();

    const onClick = useCallback(() => {
        dispatch(clearReplyToMessage());
    }, [dispatch]);

    return (
        <StyledWrapper>
            <StyledContainer>
                <StyledReplyContainer>
                    <Reply color={"#1677ff"} fontSize={"20px"} />
                </StyledReplyContainer>
                <StyledUsernameMessageContainer>
                    <p>{friend.username}</p>
                    <div>{repliedMessage.content}</div>
                </StyledUsernameMessageContainer>
                <div>
                    <StyledButton onClick={onClick}>
                        <Close color={"lightgray"} fontSize={"20px"} />
                    </StyledButton>
                </div>
            </StyledContainer>
        </StyledWrapper>
    );
};
