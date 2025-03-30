import React, { useState } from "react";
import { Form, Input, message, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

 

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("user"); // Default login type is user
  const linkTo = loginType === "user" ? "/RegisterPage" : "/doctorRegisterPage"

  // Handle change in login type (User or Doctor)
  const handleLoginTypeChange = (value) => {
    setLoginType(value);
  };

  const onFinishHandler = async (values) => {
     
    try {
      // Select the endpoint based on the login type
       
      const endpoint = loginType === "user" ? "/api/v1/user/login" : "/api/v1/doctor/doctorLogin";
      
      const res = await axios.post(endpoint, values);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        if(loginType=="user"){
          navigate("/");
        }else{
           navigate("/Layout2");
        }
        
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="login-form space-y-4"
        >
          <h3 className="text-center text-2xl font-semibold text-gray-700">
            Login Form
          </h3>

          <Form.Item label="Login As" name="loginType">
            <Select 
              value={loginType} 
              onChange={handleLoginTypeChange} 
              className="w-full"
            >
              <Select.Option value="user">User Login</Select.Option>
              <Select.Option value="doctor">Doctor Login</Select.Option>
            </Select>
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
           
         
          <Link to={linkTo} className="block text-blue-600 hover:underline">
          {
            loginType === 'user' ? ' Not a user? Register here' : ' New Doctor? Register here'
          }
             
          </Link>

          <button
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
