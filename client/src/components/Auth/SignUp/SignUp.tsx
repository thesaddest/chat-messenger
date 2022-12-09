import { Form, Button, Input, Typography } from "antd";
import { FC } from "react";
import { LockOutlined, UserOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../index.css";

const { Title } = Typography;

export const SignUp: FC = () => {
    const navigate = useNavigate();

    //TODO: onFinish logic
    return (
        <>
            <Title level={2}>Sign Up</Title>
            <Form name="login-form" initialValues={{ remember: true }}>
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
