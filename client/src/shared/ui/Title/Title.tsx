import { Typography } from "antd";
import { memo } from "react";

const { Title } = Typography;

export const MemoTitle = memo(() => {
    return <Title level={4}>Chat</Title>;
});
