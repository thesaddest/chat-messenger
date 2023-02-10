import { memo } from "react";
import styled from "styled-components";
import { CaretDownOutlined } from "@ant-design/icons";

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const ScrollToSeeMore = memo(() => {
    return (
        <StyledContainer>
            Scroll to see more
            <CaretDownOutlined />
        </StyledContainer>
    );
});
