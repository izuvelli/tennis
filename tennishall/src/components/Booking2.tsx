import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';

interface Booking2Props {
  onSubmit: (values: FormValues2) => void; // Define onSubmit prop
}
export interface FormValues2 {
  email: string;
  password: string;
  // Add more fields as needed for registration
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
      await axios.post('http://localhost:5000/submit-registration', values); // Use correct endpoint
      setSubmitted(true);
      onSubmit(values); // Call onSubmit function
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  };

  const handleReset = async () => {
    try {
      await axios.delete('http://localhost:5000/delete-latest-registration');
      setSubmitted(false); // Reset the submitted state
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error('Error deleting latest registration:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 400 }}> {/* Adjusted max width for smaller screens */}
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
          label="Lösenord"
           rules={[
           {
              required: true,
              message: 'Please input your password!',
          },
          {
              min: 8,
              message: 'Password must be at least 8 characters long!',
          },
          { 
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!',
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
                Bokad
              </Button>
              <Button type="default" onClick={() => {
                setSubmitted(false);
                handleReset();
              }}>
                Gör om
              </Button>
            </Form.Item>
          )}

        </Form>
      </div>
    </div>
  );
};
export default Booking2;
