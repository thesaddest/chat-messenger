import { memo, useCallback } from "react";
import styled from "styled-components";

import { Close } from "../Icons";

import { deselectAllSelectedMessages, IMessage } from "../../../entities/message";
import { useAppDispatch } from "../../lib/hooks";

import { NavbarButton } from "./NavbarButton";

interface ICancelButtonProps {
    selectedMessages: IMessage[];
}

const StyledButtonContainer = styled.div`
    padding: 0.25rem;
`;

export const CancelButton = memo<ICancelButtonProps>(({ selectedMessages }) => {
    const dispatch = useAppDispatch();

    const handleCancel = useCallback(() => {
        dispatch(deselectAllSelectedMessages(selectedMessages));
    }, [dispatch, selectedMessages]);

    return (
        <StyledButtonContainer>
            <NavbarButton type="dashed" onClick={handleCancel}>
                <Close />
            </NavbarButton>
        </StyledButtonContainer>
    );
});
