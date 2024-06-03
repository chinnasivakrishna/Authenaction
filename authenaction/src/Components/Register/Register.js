import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './register.css';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/client/register', {
                email,
                password,
            });
            console.log('Registration successful');
            navigate('/Dashboard', { state: { email, name: response.data.name } });
        } catch (error) {
            console.error(error);
            setErrorMessage('Registration failed');
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
        try {
            const res = await axios.post('http://localhost:8080/api/client/register/google', {
                token: response.credential,
            });
            console.log('Google registration successful');
            navigate('/Dashboard', { state: { email: res.data.email, name: res.data.name } });
        } catch (error) {
            console.error(error);
            setErrorMessage('Google registration failed');
        }
    };

    const handleGoogleLoginFailure = (response) => {
        console.error('Google registration failed:', response);
        setErrorMessage('Google registration failed');
    };

    return (
        <GoogleOAuthProvider clientId="520863522838-dtnd7hdr23n9v3vbejs7n2ejm9j7prfn.apps.googleusercontent.com">
            <div className="registration-container">
                <h2>Registration Page</h2>

                <form>
                    <div>
                        <label className="input-label">E-Mail:</label>
                        <input
                            type="email"
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
                    <div>
                        <label className="input-label">Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <button type="button" onClick={handleRegistration} className="registration-button">
                        Register
                    </button>
                </form>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="social-login">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        buttonText="Sign up with Google"
                    />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Registration;
