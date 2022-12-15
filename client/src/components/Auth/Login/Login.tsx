import { Form, Button, Input, Typography } from "antd";
import { FC } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { IAuthValues } from "../interfaces";
import { AUTH_RULES } from "../auth.constants";
import { StyledAuthButton } from "../StyledAuthButton";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { login } from "../../../store/auth/authSlice";

const { Title } = Typography;

export const Login: FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const onFinish = (values: IAuthValues) => {
        dispatch(login(values));
        form.resetFields();
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
