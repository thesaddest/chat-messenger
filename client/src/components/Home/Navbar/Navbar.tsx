import { FC } from "react";
import styled from "styled-components";

import { AddFriend } from "./AddFriend";

const StyledRightDiv = styled.div`
  display: flex;
  flex: 2;

  @media only screen and (max-width: 425px) {
    flex: 0;
  }
`;

const StyledLeftDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;

  @media only screen and (max-width: 425px) {
    display: flex;
    justify-content: space-evenly;
    flex: 3;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;

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

export const Navbar: FC = () => {
    return (
        <StyledContainer>
            <StyledLeftDiv>
                <AddFriend />
            </StyledLeftDiv>
            <StyledRightDiv />
        </StyledContainer>
    );
};
