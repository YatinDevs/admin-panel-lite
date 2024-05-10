import React from "react";
import { Form, Input, Button, message } from "antd";
import { useAuthContext } from "../../context/AuthProvider/AuthProvider";

const LoginTab = () => {
  const [form] = Form.useForm();
  const { logIn } = useAuthContext();

  const handleSubmit = async (values) => {
    try {
      await logIn(values);
      // If login successful, you can navigate to another page here
      message.success("Login successful");
    } catch (error) {
      console.error("Login error:", error.message);
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className="flex flex-col justify-between h-[27rem]"
    >
      <div className="inputArea space-y-2">
        <div className="formInput">
          <label htmlFor="username" className="block font-semibold pb-1">
            Contact:
          </label>
          <Form.Item
            name="contact"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              name="contact"
              placeholder="Enter your contact"
              className="shadow-md rounded-md h-12"
            />
          </Form.Item>
        </div>
        <div className="formInput">
          <label htmlFor="password" className="block font-semibold pb-1">
            Password:
          </label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              name="password"
              placeholder="Enter your password"
              className="shadow-md rounded-md h-12"
            />
          </Form.Item>
        </div>
      </div>

      <div className="actionArea text-center">
        <p className="my-2 text-blue-600 text-sm cursor-pointer">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-600  hover:bg-blue-800 text-white px-4  rounded-lg transition-all"
          >
            Log in
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default LoginTab;
