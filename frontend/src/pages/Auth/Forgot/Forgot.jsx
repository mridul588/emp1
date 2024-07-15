import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';



const Forgot = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
    });

    const { email } = credentials;

    const handleInputChange = (prop) => (event) => {
        setCredentials({
            ...credentials,
            [prop]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            alert('Please fill in all fields.');
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.post('https://emp1api-mridul588s-projects.vercel.app/api/user/forgot', credentials, { headers });
            const userData = response.data;
            //localStorage.setItem('loggedInUser', JSON.stringify(userData));
             alert('successful!');

            // if (userData.isAdmin) {
            //     navigate('/admin');
            // } else {
            //     navigate('/user');
            // }
        } catch (error) {
            console.error(error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div>
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">Reset</h1>
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
                    
                    <Button variant="contained" type="submit" className="login-button">Submit</Button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Forgot;
