import { Form, Button, Input, Typography } from "antd";
import { FC } from "react";
import { LockOutlined, UserOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { IAuthValues } from "../interfaces";
import { AUTH_RULES } from "../auth.constants";
import { StyledAuthButton } from "../StyledAuthButton";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { register } from "../../../store/auth/authSlice";

const { Title } = Typography;

export const SignUp: FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const onFinish = (values: IAuthValues) => {
        dispatch(register(values));
        form.resetFields();
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
