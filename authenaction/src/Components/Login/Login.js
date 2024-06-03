import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/client/login', {
                email,
                password,
            });
            console.log('Login successful');
            console.log('User type:', response.data);
            console.log('User type:', response.data.image);
            navigate('/Dashboard', { state: { email, name: response.data.name, image: response.data.image } });
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email or password');
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
        try {
            const res = await axios.post('http://localhost:8080/api/client/login/google', {
                token: response.tokenId,
            });
            console.log('Google login successful');
            navigate('/Dashboard', { state: { email: res.data.email, name: res.data.name, image: res.data.image } });
        } catch (error) {
            console.error(error);
            setErrorMessage('Google login failed');
        }
    };

    const handleGoogleLoginFailure = (response) => {
        console.error('Google login failed:', response);
        setErrorMessage('Google login failed');
    };

  

  return (
      <GoogleOAuthProvider clientId="520863522838-dtnd7hdr23n9v3vbejs7n2ejm9j7prfn.apps.googleusercontent.com">
        <div className="login-container">
            <h2>Login Page</h2>

            <form>
                <div>
                    <label className="input-label">E-Mail:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="input-label">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                </div>
                <button type="button" onClick={handleLogin} className="login-button">
                    Login
                </button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Don't have an account? <Link to="/Register" className="register-link">Register</Link></p>

        <div className="social-login">
                <GoogleLogin
                    clientId="520863522838-dtnd7hdr23n9v3vbejs7n2ejm9j7prfn.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={handleGoogleLoginSuccess}
                    onFailure={handleGoogleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                />
                
        </div>
        
      </div>
      </GoogleOAuthProvider>
    );
};

export default Login;
