import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("https://doctor-app-l8mc.onrender.com/api/v1/user/RegisterPage", values);
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form space-y-4"
        >
          <h3 className="text-center text-2xl font-semibold text-gray-700">
            Register Form
          </h3>
          
          <Form.Item label="Name" name="name">
            <Input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>
          
          <Form.Item label="Email" name="email">
            <Input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>
          
          <Form.Item label="Password" name="password">
            <Input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>
          
          <Link to="/login" className="block text-blue-600 hover:underline">
            Already a user? Login here
          </Link>
          
          <button
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Register
          </button>
        </Form>
      </div>
    </div>
  </>
  
  );
};

export default RegisterPage;