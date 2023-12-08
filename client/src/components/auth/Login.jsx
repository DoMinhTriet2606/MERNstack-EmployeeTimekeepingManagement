import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import "../../assets/css/login/login.css";

const Login = () => {
    useEffect(() => {
        success();
    }, []);
    // Context
    const { loginUser } = useContext(AuthContext);

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });
    const [alert, setAlert] = useState(null);

    const onChangeLoginForm = (event) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const { username, password } = loginForm;

    const login = async (event) => {
        try {
            const loginData = await loginUser(loginForm);

            if (!loginData.success) {
                messageApi.open({
                    type: "error",
                    content: loginData.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // message
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info("Please fill your Information here! ^^");
    };
    const success = () => {
        messageApi.open({
            type: "success",
            content: "Please login here and work with us! ^^",
            icon: <LoginOutlined />,
        });
    };
    const error = () => {
        messageApi.open({
            type: "error",
            content: "You need to register at least 5 shifts",
        });
    };
    const warning = () => {
        messageApi.open({
            type: "warning",
            content: "This is a warning message",
        });
    };

    return (
        <>
            <div className="container--v2">
                {contextHolder}
                <div className="glass">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={login}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                autoFocus
                                placeholder="Username"
                                name="username"
                                value={username}
                                required
                                onChange={onChangeLoginForm}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                required
                                onChange={onChangeLoginForm}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Link to="/help" className="login-form-forgot" href="">
                                Forgot password
                            </Link>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <Link to="/help">Contact to Manager</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            {/* <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: 1 + "rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form"
                                            className="img-fluid"
                                            style={{ borderRadius: "1rem 0 0 1rem" }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form onSubmit={login}>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <span className="h1 fw-bold mb-0">Login</span>
                                                </div>

                                                <h5
                                                    className="fw-normal mb-3 pb-3"
                                                    style={{ letterSpacing: 1 + "px" }}
                                                >
                                                    Sign into your account
                                                </h5>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="text"
                                                        id="form2Example17"
                                                        className="form-control form-control-lg"
                                                        name="username"
                                                        required
                                                        value={username}
                                                        onChange={onChangeLoginForm}
                                                    />
                                                    <label
                                                        className="form-label"
                                                        for="form2Example17"
                                                    >
                                                        Username
                                                    </label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        id="form2Example27"
                                                        className="form-control form-control-lg"
                                                        name="password"
                                                        required
                                                        value={password}
                                                        onChange={onChangeLoginForm}
                                                    />
                                                    <label
                                                        className="form-label"
                                                        for="form2Example27"
                                                    >
                                                        Password
                                                    </label>
                                                </div>

                                                <AlertMessage info={alert} />

                                                <div className="pt-1 mb-4">
                                                    <button
                                                        className="btn btn-dark btn-lg btn-block"
                                                        type="submit"
                                                    >
                                                        Login
                                                    </button>
                                                </div>

                                                <Link to="/help">
                                                    <a className="small text-muted" href="#!">
                                                        Forgot password?
                                                    </a>
                                                </Link>
                                                <p
                                                    className="mb-5 pb-lg-2"
                                                    style={{ color: "#393f81" }}
                                                >
                                                    Don't have an account?{" "}
                                                    <Link to="/help">
                                                        <a href="#!" style={{ color: "#393f81" }}>
                                                            Please talk to Manager
                                                        </a>
                                                    </Link>
                                                </p>
                                                <a href="#!" className="small text-muted">
                                                    Terms of use.
                                                </a>
                                                <a href="#!" className="small text-muted">
                                                    Privacy policy
                                                </a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
};

export default Login;
