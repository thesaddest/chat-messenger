import { Form, Button, Input, Typography } from "antd";
import { FC } from "react";
import { LockOutlined, UserOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { IAuthValues } from "../interfaces";
import "../index.css";

const { Title } = Typography;

export const SignUp: FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values: IAuthValues) => {
        form.resetFields();
        fetch("http://localhost:4000/api/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((data) => console.log(data));
    };

    //TODO: onFinish logic
    return (
        <>
            <Title level={2}>Sign Up</Title>
            <Form form={form} name="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email" },
                        { type: "email", message: "Please enter a valid email" },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: "Please enter your password" },
                        { min: 6, message: "Password must be at least 6 characters" },
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
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
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Confirm your password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Create Account
                    </Button>
                    <Button icon={<LeftOutlined />} className="auth-button" type="link" onClick={() => navigate("/")}>
                        Back
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
