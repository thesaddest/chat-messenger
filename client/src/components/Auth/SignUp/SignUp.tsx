import { Form, Button, Input, Typography } from "antd";
import { FC, useState } from "react";
import { LockOutlined, UserOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { IRegisterValues } from "../interfaces";
import { AUTH_RULES } from "../auth.constants";
import { StyledAuthButton } from "../StyledAuthButton";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { register } from "../../../store/auth/authSlice";
import { StyledAuthErrorAlert } from "../StyledAuthErrorAlert";

const { Title } = Typography;

export const SignUp: FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const [error, setError] = useState<string | null>(null);

    const onFinish = async (values: IRegisterValues) => {
        const { payload } = await dispatch(register(values));

        if (typeof payload === "string") {
            return setError(payload);
        }

        navigate("/home");
        form.resetFields();
    };

    return (
        <>
            <Title level={2}>Sign Up</Title>
            <Form form={form} name="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item name="email" rules={AUTH_RULES.EMAIL} hasFeedback>
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item name="username" rules={AUTH_RULES.USERNAME} hasFeedback>
                    <Input prefix={<UserOutlined />} placeholder="Username" />
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
            {error && <StyledAuthErrorAlert type="error" message={error} />}
        </>
    );
};
