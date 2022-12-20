import { Avatar, Tabs } from "antd";
import { FC } from "react";
import styled from "styled-components";

const StyledAvatar = styled(Avatar)`
    width: 24px;
    height: 24px;
    line-height: 12px;
`;

const items = [
    {
        label: (
            <span>
                <StyledAvatar size={"small"} /> John Snow
            </span>
        ),
        key: "1",
        children: `Content of Tab 1`,
    },
    {
        label: (
            <span>
                <StyledAvatar /> John Snow
            </span>
        ),
        key: "2",
        children: `Content of Tab 2`,
    },
    {
        label: (
            <span>
                <StyledAvatar /> John Snow
            </span>
        ),
        key: "3",
        children: `Content of Tab 3`,
    },
];

export const Chat: FC = () => {
    return <Tabs tabPosition={"left"} items={items} />;
};
