import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LeavePage.css';
import config from '../../utils/config';

const LeavePage = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const navigate = useNavigate();

    const [leaveDetails, setLeaveDetails] = useState({
        userId: user.id,
        fromDate: "",
        toDate: "",
        purpose: "",
        status: 1,
        email: ""
    });

    const base_URL = config.backendUrl;

    const { fromDate, toDate, purpose, email } = leaveDetails;

    const handleInputChange = (prop) => (event) => {
        setLeaveDetails({
            ...leaveDetails,
            [prop]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!fromDate || !toDate || !purpose || !email) {
            alert('Please fill in all fields.');
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
        };

        try {
            const response = await axios.post('https://emp1api-mridul588s-projects.vercel.app/api/user/leave', leaveDetails, { headers });
            alert('Leave request created successfully!');
            navigate('/leave');
        } catch (error) {
            console.error(error);
            alert('Leave request creation failed. Please try again.');
        }
    };

    const handleStatusClick = () => {
        navigate('/status');
    };

    return (
        <div className='out' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h1 style={{ marginBottom: '30px', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }}>Request Leave</h1>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                    <TextField
                        required
                        variant="outlined"
                        type="date"
                        value={fromDate}
                        onChange={handleInputChange("fromDate")}
                        name="fromDate"
                        id="fromDate"
                        className="custom-textfield"
                        label="From Date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: '350px' }}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                    <TextField
                        required
                        variant="outlined"
                        type="date"
                        value={toDate}
                        onChange={handleInputChange("toDate")}
                        name="toDate"
                        id="toDate"
                        className="custom-textfield"
                        label="To Date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ width: '350px' }}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                    <TextField
                        required
                        variant="outlined"
                        type="text"
                        value={purpose}
                        onChange={handleInputChange("purpose")}
                        name="purpose"
                        id="purpose"
                        className="custom-textfield"
                        placeholder="Enter Purpose"
                        style={{ width: '350px' }}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
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
                        style={{ width: '350px' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        variant="contained"
                        type="submit"
                        name='submit_button'
                        id="create_leave_button"
                        style={{ width: '150px' }}
                    >
                        Request Leave
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleStatusClick}
                        style={{ width: '150px' }}
                    >
                        Check Status
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LeavePage;
