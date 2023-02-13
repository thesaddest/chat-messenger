import { Badge } from "antd";
import { memo, ReactNode } from "react";
import styled from "styled-components";

interface IMessagesCountBadgeProps {
    count: number;
    children: ReactNode;
}

const StyledBadge = styled(Badge)<IMessagesCountBadgeProps>`
  .ant-scroll-number {
    top: 0.7rem;
    right: ${(props) => (props.count > 9 ? "2.6rem" : "3rem")}
`;

export const MessagesCountBadge = memo<IMessagesCountBadgeProps>(({ children, count }) => {
    return (
        <StyledBadge overflowCount={9} count={count > 0 ? count : 0}>
            {children}
        </StyledBadge>
    );
});
