import { Form, Button, Input, Typography } from "antd";
import { FC } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { IAuthValues } from "../interfaces";
import { AUTH_RULES } from "../auth.constants";
import { StyledAuthButton } from "../StyledAuthButton";

const { Title } = Typography;

export const Login: FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values: IAuthValues) => {
        form.resetFields();
        fetch("http://localhost:4000/api/login", {
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
            <Title level={2}>Log In</Title>
            <Form form={form} name="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item name="email" rules={AUTH_RULES.EMAIL} hasFeedback>
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item name="password" rules={AUTH_RULES.PASSWORD} hasFeedback>
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Login
                    </Button>
                    <StyledAuthButton className="auth-button" type="link" onClick={() => navigate("/register")}>
                        Or create an account!
                    </StyledAuthButton>
                </Form.Item>
            </Form>
        </>
    );
};
