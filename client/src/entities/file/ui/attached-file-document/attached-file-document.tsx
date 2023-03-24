import { memo } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { FileOutlined } from "@ant-design/icons";

import { IAttachedFileProps } from "../../model";

const StyledContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
`;

const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledButton = styled(Button)`
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 0.5rem;
    height: 36px;

    @media only screen and (min-width: 1080px) {
        display: flex;
        height: 40px;
        width: 40px;
    }
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

export const AttachedFileDocument = memo<IAttachedFileProps>(({ attachedFile }) => {
    return (
        <StyledContainer>
            <StyledButtonContainer>
                <StyledButton>
                    <a href={attachedFile.location}>
                        <FileOutlined />
                    </a>
                </StyledButton>
            </StyledButtonContainer>

            <StyledFileNameContainer>
                <p>{attachedFile.originalName}</p>
            </StyledFileNameContainer>
        </StyledContainer>
    );
});
