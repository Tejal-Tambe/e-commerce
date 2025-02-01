import React, { useState } from 'react';
import '../css/LoginPage.css';
import Navbar from './Navbar';
import { GoogleLogin } from '@react-oauth/google';

const CLIENT_ID = "277967115759-atb4glcapqaotla6tp0c9uj24b6pp18m.apps.googleusercontent.com"

const Login = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    const { clientId } = response;
    setUser(clientId);
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
      !user ? (
        <div className="login-page login-page-container">
          <div className="login-container">
            <h2>Welcome to the Shopping App</h2>
            <p>Please log in to continue shopping</p>
              <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy="single_host_origin"
                className="google-login-button"
              />
          </div>
        </div>
      )
      : 
      (
        <div>
          <Navbar handleLogout={handleLogout} />
        </div>
      )
    );
};

export default Login;
