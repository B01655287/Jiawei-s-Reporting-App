import React, { useEffect, useState } from "react";
import { history } from "@/router/history";
import { NavBar, Form, Input, Button, Toast, Modal } from "antd-mobile";
import { login } from "../utils/db";

const Login = () => {
  const [form] = Form.useForm();
  const [detail, setDetail] = useState({});

  const onBack = () => {
    history.back();
  };
  const toRegister = () => {
    history.push(`/register`);
  };
  const onFinish = async (values) => {
    login(values)
      .then((r) => {
        localStorage.setItem('user', JSON.stringify(r))
        Modal.alert({
          content: "Login Successful (*≧∀≦*)",
          confirmText: 'ok',
          onConfirm: () => {
            history.push("/");
          },
        });
      })
      .catch((err) => {
        Toast.show({
          content: err,
        });
      });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <NavBar
        onBack={onBack}
        right={
          <div onClick={toRegister} style={{ fontSize: "1.2rem" }}>
            Register
          </div>
        }
      >
        Login
      </NavBar>

      <Form
        name="form"
        form={form}
        initialValues={detail}
        onFinish={onFinish}
        footer={
          <>
            <Button block type="submit" color="primary" size="large">
              Login
            </Button>
          </>
        }
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input placeholder="Password" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
