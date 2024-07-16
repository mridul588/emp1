import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import config from '../../../utils/config';

const Signup = () => {
    const navigate = useNavigate();
    const base_URL = config.backendUrl;

    const [userCredentials, setUserCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAdmin: false,
        isLead: false,
        team: "",
    });

    const { name, email, password, confirmPassword, team } = userCredentials;

    const handleInputChange = (prop) => (event) => {
        setUserCredentials({
            ...userCredentials,
            [prop]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const user = JSON.parse(localStorage.getItem('loggedInUser'));

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
        };

        try {
            const response = await axios.post(`${base_URL}api/admin/signup`, userCredentials, { headers });
            alert('Signup successful!');
        } catch (error) {
            console.error(error);
            alert('Signup failed. Please try again.');
        }
    };

    const generateRandomPassword = () => {
        const randomPassword = Math.random().toString(36).slice(-8);
        setUserCredentials({
            ...userCredentials,
            password: randomPassword,
            confirmPassword: randomPassword,
        });
    };

    return (
        <div id="signup-form">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <TextField
                    required
                    variant="outlined"
                    type="text"
                    value={name}
                    onChange={handleInputChange("name")}
                    autoFocus
                    name="name"
                    id="name"
                    placeholder="Enter Name"
                    fullWidth
                />
                <label htmlFor="email">Email:</label>
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
                <label htmlFor="password">Password:</label>
                <TextField
                    required
                    variant="outlined"
                    type="text"
                    value={password}
                    onChange={handleInputChange("password")}
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    fullWidth
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <TextField
                    required
                    variant="outlined"
                    type="text"
                    value={confirmPassword}
                    onChange={handleInputChange("confirmPassword")}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    fullWidth
                />
                <label htmlFor="team">Team:</label>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="team-label">Team</InputLabel>
                    <Select
                        labelId="team-label"
                        id="team"
                        value={team}
                        onChange={handleInputChange("team")}
                        label="Team"
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="HR">HR</MenuItem>
                        <MenuItem value="WEB">WEB</MenuItem>
                        <MenuItem value="ML">ML</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={generateRandomPassword} className="generate-password-button">
                    Generate Random Password
                </Button>
                <Button variant="contained" type="submit" className="signup-button">Sign Up</Button>
            </form>
        </div>
    );
};

export default Signup;
