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
        <div className='out-user' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2>Hello {user.name}</h2>
            <h1 style={{ paddingBottom: '30px', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }}>User Dashboard</h1>
            <Button
                variant="contained"
                onClick={handleTaskNavigation}
                style={{height:'40px', marginBottom: '20px', width: '150px' }}
            >
                Go to Task
            </Button>
            <Button
                variant="contained"
                onClick={handleLeaveNavigation}
                style={{height:'40px', width: '150px' }}
            >
                Go to Leave
            </Button>
        </div>
    );
};

export default UserDashboard;
