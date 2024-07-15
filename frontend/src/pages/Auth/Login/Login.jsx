import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const { email, password } = credentials;

    const handleInputChange = (prop) => (event) => {
        setCredentials({
            ...credentials,
            [prop]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.post('https://emp1api-mridul588s-projects.vercel.app/api/user/login', credentials, { headers });
            const userData = response.data;
            localStorage.setItem('loggedInUser', JSON.stringify(userData));
            // alert('Login successful!');

            if (userData.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        } catch (error) {
            console.error(error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <TextField
                            required
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={handleInputChange("email")}
                            name="email"
                            id="email"
                            placeholder="Enter Email"
                            fullWidth
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <TextField
                            required
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={handleInputChange("password")}
                            name="password"
                            id="password"
                            placeholder="Enter Password"
                            fullWidth
                        />
                    </div>
                    <Button variant="contained" type="submit" className="login-button">Login</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
