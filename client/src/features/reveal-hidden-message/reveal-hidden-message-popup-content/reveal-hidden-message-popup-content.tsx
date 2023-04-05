import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import { Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { ErrorAlert, MemoTitle } from "../../../shared/ui";
import { IMessage, revealHiddenMessage } from "../../../entities/message";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { COLORS, SIZES } from "../../../shared/const";
import { AcceptButton } from "../../../shared/ui/Buttons/AcceptButton";

interface IRevealHiddenMessagePopupContentProps {
    messageToReveal: IMessage;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setIsMessageRevealed: Dispatch<SetStateAction<boolean>>;
    modalError: string;
    setModalError: Dispatch<SetStateAction<string>>;
}

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const StyledButtonsMessageContainer = styled.div`
    display: flex;
    width: 70%;
    justify-content: space-evenly;
    align-items: center;

    @media only screen and (max-width: ${SIZES.MOBILE}) {
        width: 100%;
    }
`;

const StyledMessageHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0 2rem 0;
    text-align: start;
`;

const StyledNote = styled.span`
    font-size: 1rem;
    font-weight: 800;
`;

const StyledDisappear = styled(StyledNote)`
    color: ${COLORS.MAIN_RED};
`;

const StyledErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 1rem;
`;

const StyledMessageContentHolder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;

export const RevealHiddenMessagePopupContent = memo<IRevealHiddenMessagePopupContentProps>(
    ({ messageToReveal, setIsModalOpen, setModalError, modalError, setIsMessageRevealed }) => {
        const dispatch = useAppDispatch();
        const [revealedMessage, setRevealedMessage] = useState<string>("");

        const handleCancel = useCallback(() => {
            setIsModalOpen(false);
        }, [setIsModalOpen]);

        const handleClickReveal = useCallback(async () => {
            const { payload } = await dispatch(revealHiddenMessage(messageToReveal));

            if (typeof payload === "undefined") {
                return setModalError("Unexpected error.");
            }

            if (typeof payload === "string") {
                return setModalError(payload);
            }

            setRevealedMessage(payload.content);
            setIsMessageRevealed(true);
        }, [dispatch, messageToReveal, setIsMessageRevealed, setModalError]);

        return (
            <StyledContainer>
                <MemoTitle title={"Reveal a message?"} level={4} />
                <StyledMessageHolder>
                    <p>
                        <StyledNote>*NOTE*: </StyledNote>The message will <StyledDisappear>disappear</StyledDisappear>{" "}
                        after closing the window
                    </p>
                </StyledMessageHolder>
                {modalError ? (
                    <StyledErrorContainer>
                        {modalError && <ErrorAlert type="error" message={modalError} />}
                    </StyledErrorContainer>
                ) : (
                    <StyledButtonsMessageContainer>
                        {revealedMessage ? (
                            <StyledMessageContentHolder>
                                <p>Your message is: </p>
                                <ErrorAlert type="success" message={revealedMessage} />
                            </StyledMessageContentHolder>
                        ) : (
                            <>
                                <AcceptButton type="dashed" onClick={handleClickReveal}>
                                    <CheckOutlined />
                                </AcceptButton>
                                <Button type="dashed" danger onClick={handleCancel}>
                                    <CloseOutlined />
                                </Button>
                            </>
                        )}
                    </StyledButtonsMessageContainer>
                )}
            </StyledContainer>
        );
    },
);
