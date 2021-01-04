import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Form, Input, Button, Spin } from 'antd';
import * as reselect from '../reselect/login-reselect';
import * as action from '../actions/index';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, messageError } = useSelector(createStructuredSelector({
    loading: reselect.loadingLogin,
    messageError: reselect.messageErrorLogin
  }));

  const onFinish = values => {
    dispatch(action.loginRequest(values.username, values.password));
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <h1 style={{ textAlign: 'center' }}> Login </h1>
          { messageError !== null ? (
            <p style={{color: 'red', textAlign: 'center'}}>{messageError.message}</p>
          ) : null }
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6} style={{padding: '10px', border: '1px solid #ccc'}}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
            {loading ? (
              <>
                <Button disabled type="primary" htmlType="submit">
                  Submit
                </Button>
                <Spin style={{ marginLeft: '10px' }} />
              </>
            ) : (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
              
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}
export default React.memo(LoginPage);