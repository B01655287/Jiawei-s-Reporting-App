import React, { useEffect, useState } from "react";
import { history } from "@/router/history";
import { NavBar, Form, Input, Button, Toast, Modal } from "antd-mobile";
import { register } from '../utils/db'

const Register = () => {
  const [detail, setDetail] = useState({});

  const onBack = () => {
    history.back();
  };
  const onFinish = async (values) => {
    register(values).then(r => {
      Modal.alert({
        content: ' Registration Successful (*≧∀≦*)',
        confirmText: 'ok',
        onConfirm: () => {
          history.push('/login')
        },
      })
    }).catch(err => {
      Toast.show({
        content: err
      })
    })
  };

  useEffect(() => {}, []);

  return (
    <div>
      <NavBar onBack={onBack}>Register</NavBar>

      <Form
        name="form"
        initialValues={detail}
        onFinish={onFinish}
        footer={
          <>
            <Button block type="submit" color="primary" size="large">
              Register
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

export default Register;
