import { Form, Button, Input, Typography } from "antd";
import { FC } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: FC = () => {
    const { Title } = Typography;
    const navigate = useNavigate();

    //TODO: onFinish logic
    return (
        <>
            <Title level={2}>Log In</Title>
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
                        { required: true, message: "Please input your password" },
                        { min: 6, message: "Password must be at least 6 characters" },
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Login
                    </Button>
                    <Button className="login-button" type="link" onClick={() => navigate("/register")}>
                        Or create an account!
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Login;
