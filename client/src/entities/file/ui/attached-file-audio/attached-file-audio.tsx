import { memo } from "react";
import styled from "styled-components";
import { CustomerServiceOutlined } from "@ant-design/icons";

import { IAttachedFileProps } from "../../model";
import { COLORS } from "../../../../shared/const";

const StyledAudio = styled.audio`
    max-height: 100%;
    width: 100%;
    display: flex;
    justify-content: start;
`;

const StyledFileNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  padding-left: 0.5rem;

  p {
    font-weight: 600;
    color: ${COLORS.MAIN_WHITE};
`;

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
`;

const StyledIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledFileNameAndIconContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
`;

export const AttachedFileAudio = memo<IAttachedFileProps>(({ attachedFile }) => {
    return (
        <StyledContainer>
            <StyledFileNameAndIconContainer>
                <StyledIconContainer>
                    <CustomerServiceOutlined style={{ fontSize: "24px", color: `${COLORS.MAIN_WHITE};` }} />
                </StyledIconContainer>
                <StyledFileNameContainer>
                    <p>{attachedFile.originalName}</p>
                </StyledFileNameContainer>
            </StyledFileNameAndIconContainer>
            <StyledAudio controls>
                <source src={attachedFile.location} />
            </StyledAudio>
        </StyledContainer>
    );
});
