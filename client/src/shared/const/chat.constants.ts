import { Rule } from "antd/es/form";

interface IChatRules {
    MESSAGE: Rule[];
}

export const DEFAULT_ACTIVE_KEY = "START";

export const MESSAGE_RULES: IChatRules = {
    MESSAGE: [
        { type: "string", required: true, message: "Please enter at least 1 character", whitespace: true },
        { min: 1, message: "Please enter at least 1 character" },
    ],
};

export const DEFAULT_TAB_ITEM = [
    {
        label: "No friends",
        key: DEFAULT_ACTIVE_KEY,
        children: "Add some friends :)",
        style: { display: "flex", justifyContent: "center", paddingTop: "0.5rem" },
    },
];
