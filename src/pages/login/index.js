import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setMenuList } from "../../store/reducers/menuItems";

import { getMenu } from "../../api";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (localStorage.getItem("token")) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = (val) => {
    if (!val.password || !val.username) {
      return message.open({
        type: "warning",
        content: "Please input username and password",
      });
    }
    getMenu(val).then(({ data }) => {
      localStorage.setItem("token", data.data.token);

      // console.log(data.data.menu);
      dispatch(setMenuList(data.data.menu));

      navigate("/home");
    });
  };

  return (
    <Form className="login-container" onFinish={handleSubmit}>
      <div className="login_title">System Login</div>

      <Form.Item label="useranme" name="username">
        <Input placeholder="Please input username" />
      </Form.Item>
      <Form.Item label="password" name="password">
        <Input.Password placeholder="Please input password" />
      </Form.Item>
      <Form.Item className="login-button">
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
