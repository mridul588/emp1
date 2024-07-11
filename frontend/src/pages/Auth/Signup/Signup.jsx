import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControlLabel, Checkbox, InputLabel, FormControl } from '@mui/material';
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

    const { name, email, password, confirmPassword, isAdmin, isLead, team } = userCredentials;

    const handleInputChange = (prop) => (event) => {
        setUserCredentials({
            ...userCredentials,
            [prop]: event.target.value,
        });
    };

    const handleCheckboxChange = (prop) => (event) => {
        setUserCredentials({
            ...userCredentials,
            [prop]: event.target.checked,
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
            const response = await axios.post('https://emp1api-mridul588s-projects.vercel.app/api/admin/signup', userCredentials, { headers });
           // localStorage.setItem('loggedInUser', JSON.stringify(response.data));
            alert('Signup successful!');
            // navigate('/login');
        } catch (error) {
            console.error(error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <>
            <div className='out' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '400px'}}>
                    <h1 style={{ marginBottom: '30px', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }}>Sign Up</h1>
                    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <label htmlFor="name" style={{ width: '100px' }}>Name</label>
                            <TextField
                                required
                                variant="outlined"
                                type="text"
                                value={name}
                                onChange={handleInputChange("name")}
                                autoFocus
                                name="name"
                                id="name"
                                className="custom-textfield"
                                placeholder="Enter Name"
                                style={{ flex: 1 }}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <label htmlFor="email" style={{ width: '100px' }}>Email</label>
                            <TextField
                                required
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={handleInputChange("email")}
                                name="email"
                                id="email"
                                className="custom-textfield"
                                placeholder="Enter Email"
                                style={{ flex: 1 }}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <label htmlFor="password" style={{ width: '100px' }}>Password</label>
                            <TextField
                                required
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={handleInputChange("password")}
                                name="password"
                                id="password"
                                className="custom-textfield"
                                placeholder="Enter Password"
                                style={{ flex: 1 }}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <label htmlFor="confirmPassword" style={{ width: '100px' }}>Confirm Password</label>
                            <TextField
                                required
                                variant="outlined"
                                type="password"
                                value={confirmPassword}
                                onChange={handleInputChange("confirmPassword")}
                                name="confirmPassword"
                                id="confirmPassword"
                                className="custom-textfield"
                                placeholder="Confirm Password"
                                style={{ flex: 1 }}
                            />
                        </div>
                        {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isAdmin}
                                        onChange={handleCheckboxChange("isAdmin")}
                                        name="isAdmin"
                                        id="isAdmin"
                                    />
                                }
                                label="Is Admin"
                                style={{ width: '100px' }}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isLead}
                                        onChange={handleCheckboxChange("isLead")}
                                        name="isLead"
                                        id="isLead"
                                    />
                                }
                                label="Is Lead"
                                style={{ width: '100px' }}
                            />
                        </div> */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <label htmlFor="team" style={{ width: '100px' }}>Team</label>
                            <FormControl variant="outlined" style={{ flex: 1 }}>
                                <InputLabel id="team-label">Team</InputLabel>
                                <Select
                                    labelId="team-label"
                                    id="team"
                                    value={team}
                                    onChange={handleInputChange("team")}
                                    label="Team"
                                    className="custom-selectfield"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="HR">HR</MenuItem>
                                    <MenuItem value="WEB">WEB</MenuItem>
                                    <MenuItem value="ML">ML</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <Button variant="contained" type="submit" name='submit_button' id="signup_button" style={{ marginTop: '12px' }}>Sign Up</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
