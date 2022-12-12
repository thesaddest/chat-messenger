import { Form, Button, Input, Typography } from "antd";
import { FC } from "react";
import { LockOutlined, UserOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { IAuthValues } from "../interfaces";
import { AUTH_RULES } from "../auth.constants";
import { StyledAuthButton } from "../StyledAuthButton";

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

    return (
        <>
            <Title level={2}>Sign Up</Title>
            <Form form={form} name="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item name="email" rules={AUTH_RULES.EMAIL} hasFeedback>
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item name="password" rules={AUTH_RULES.PASSWORD} hasFeedback>
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={AUTH_RULES.CONFIRM_PASSWORD}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Confirm your password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Create Account
                    </Button>
                    <StyledAuthButton
                        icon={<LeftOutlined />}
                        className="auth-button"
                        type="link"
                        onClick={() => navigate("/")}
                    >
                        Back
                    </StyledAuthButton>
                </Form.Item>
            </Form>
        </>
    );
};
