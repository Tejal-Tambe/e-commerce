import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = "277967115759-atb4glcapqaotla6tp0c9uj24b6pp18m.apps.googleusercontent.com"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App/>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
