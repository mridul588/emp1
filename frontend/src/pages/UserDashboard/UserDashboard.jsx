import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './UserDashboard.css';
import config from '../../utils/config';

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const navigate = useNavigate();

    const base_URL = config.backendUrl;

    const handleTaskNavigation = () => {
        navigate('/task');
    };

    const handleLeaveNavigation = () => {
        navigate('/leave');
    };

    return (
        <div className='out' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <h3>Hello {user.name}</h3>
            <h1 style={{ marginBottom: '30px', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }}>User Dashboard</h1>
            <Button
                variant="contained"
                onClick={handleTaskNavigation}
                style={{ marginBottom: '20px', width: '150px' }}
            >
                Go to Task
            </Button>
            <Button
                variant="contained"
                onClick={handleLeaveNavigation}
                style={{ width: '150px' }}
            >
                Go to Leave
            </Button>
        </div>
    );
};

export default UserDashboard;
