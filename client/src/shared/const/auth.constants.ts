import { Rule } from "antd/es/form";

interface IAuthRules {
    EMAIL: Rule[];
    PASSWORD: Rule[];
    USERNAME: Rule[];
    CONFIRM_PASSWORD: Rule[];
}

export const AUTH_RULES: IAuthRules = {
    EMAIL: [
        { required: true, message: "Please input your email" },
        { type: "email", message: "Please enter a valid email" },
    ],
    PASSWORD: [
        { required: true, message: "Please enter your password" },
        { min: 6, message: "Password must be at least 6 characters" },
    ],
    USERNAME: [
        { required: true, message: "Please enter your username" },
        { min: 3, message: "Username must be at least 3 characters" },
    ],
    CONFIRM_PASSWORD: [
        { required: true, message: "Please confirm your password" },
        { min: 6, message: "Password must be at least 6 characters" },
        ({ getFieldValue }) => ({
            validator(_, value): Promise<void> {
                if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                }
                return Promise.reject("Passwords do not match");
            },
        }),
    ],
};
