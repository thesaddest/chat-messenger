import { Form, Button, Input, Typography } from "antd";
import { FC, useState } from "react";
import { LockOutlined, UserOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AUTH_RULES } from "../../shared/const/auth.constants";
import { ZeroPaddingButton, AuthErrorAlert } from "../../shared/ui";
import { register } from "../../entities/user/model/user";
import { useAppDispatch } from "../../shared/lib/hooks/redux";

import { IRegisterValues } from "./interfaces";

const { Title } = Typography;

const StyledSignUpContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RegisterPage: FC = () => {
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
        <StyledSignUpContainer>
            <Title level={2}>Sign Up</Title>
            <Form form={form} name="register-form" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item name="email" rules={AUTH_RULES.EMAIL} hasFeedback>
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item name="username" rules={AUTH_RULES.USERNAME} hasFeedback>
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>

                <Form.Item name="password" rules={AUTH_RULES.PASSWORD} hasFeedback>
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password"
                                    autoComplete="password" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={AUTH_RULES.CONFIRM_PASSWORD}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Confirm your password"
                                    autoComplete="password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Create Account
                    </Button>
                    <ZeroPaddingButton
                        icon={<LeftOutlined />}
                        type="link"
                        onClick={() => navigate("/")}
                    >
                        Back
                    </ZeroPaddingButton>
                </Form.Item>
            </Form>
            {error && <AuthErrorAlert type="error" message={error} />}
        </StyledSignUpContainer>
    );
};
