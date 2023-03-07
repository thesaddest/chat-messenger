import { memo } from "react";

import styled from "styled-components";

import { IAttachedFileProps } from "../../model";

const StyledAudio = styled.audio`
    max-height: 100%;
    max-width: 100%;
`;

const StyledFileNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  padding-left: 0.5rem;

  p {
    font-weight: 600;
    color: whitesmoke;
`;

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AttachedFileAudio = memo<IAttachedFileProps>(({ attachedFile }) => {
    return (
        <StyledContainer>
            <StyledAudio controls>
                <source src={attachedFile.location} />
            </StyledAudio>
            <StyledFileNameContainer>
                <p>{attachedFile.originalName}</p>
            </StyledFileNameContainer>
        </StyledContainer>
    );
});
