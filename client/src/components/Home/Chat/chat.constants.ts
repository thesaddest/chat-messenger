import { Rule } from "antd/es/form";

interface IChatRules {
    MESSAGE: Rule[];
}

export const MESSAGE_RULES: IChatRules = {
    MESSAGE: [
        { type: "string", required: true, message: "Please enter the message" },
        { min: 1, message: "Please enter at least 1 character" },
    ],
};

export const DEFAULT_TAB_ITEM = [
    { label: "No friends", key: "1", children: "Add some friends :)", style: { paddingTop: "0.5rem" } },
];
