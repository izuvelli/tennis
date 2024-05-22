import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';

interface Booking2Props {
  onSubmit: (values: FormValues2) => void; // Define onSubmit prop
}
export interface FormValues2 {
  // Define the type for form values
  email: string;
  password: string;
  // Add more fields as needed
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Booking2: React.FC<Booking2Props> = ({ onSubmit }) => { // Specify the type of props
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values: FormValues2) => { // Specify type for values
    console.log('Received values of form: ', values);
    try {
      await axios.post('http://localhost:5000/submit-booking', values);
      setSubmitted(true);
      onSubmit(values); // Call onSubmit function
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: 600, marginTop: "0px" }}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ prefix: '86' }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          {/* Add more form items as needed */}

          {!submitted && (
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          )}

          {submitted && (
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" disabled>
                Submitted
              </Button>
              <Button type="default" onClick={() => setSubmitted(false)}>
                Reset
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Booking2;


