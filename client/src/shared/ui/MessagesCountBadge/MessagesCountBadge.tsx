import { Badge } from "antd";
import { memo, ReactNode } from "react";
import styled from "styled-components";

interface IMessagesCountBadgeProps {
    count: number;
    children: ReactNode;
    color?: string;
}

const StyledBadge = styled(Badge)<IMessagesCountBadgeProps>`
  .ant-scroll-number {
    top: 0.7rem;
    right: ${(props) => (props.count > 9 ? "2.6rem" : "3rem")}
`;

export const MessagesCountBadge = memo<IMessagesCountBadgeProps>(({ children, count, color }) => {
    return (
        <StyledBadge overflowCount={9} count={count > 0 ? count : 0} color={color}>
            {children}
        </StyledBadge>
    );
});
