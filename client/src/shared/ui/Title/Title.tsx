import { Typography } from "antd";
import { memo } from "react";

declare const TITLE_ELE_LIST: [1, 2, 3, 4, 5];
const { Title } = Typography;

interface IMemoTitleProps {
    title: string;
    level?: typeof TITLE_ELE_LIST[number];
}

export const MemoTitle = memo<IMemoTitleProps>(({ title, level }) => {
    return <Title level={level ? level : 4}>{title}</Title>;
});
