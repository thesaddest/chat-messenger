import { Divider } from "antd";
import { FC } from "react";
import styled from "styled-components";

import { AddFriend } from "./AddFriend";

const StyledDivider = styled(Divider)`
  margin: 0;
`;

const StyledContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: start;
  @media only screen and (max-width: 425px) {
    justify-content: space-evenly;
  }
`;

export const Navbar: FC = () => {
    return (
        <>
            <StyledContainer>
                <AddFriend />
            </StyledContainer>
            <StyledDivider />
        </>
    );
};
