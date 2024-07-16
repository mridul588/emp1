import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './AdminDashboard.css';
import BackButton from '../../../components/Back/BackButton';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const navigate = useNavigate();

    const handleTaskNavigation = () => {
        navigate('/seeTask');
    };

    const handleLeaveNavigation = () => {
        navigate('/seeLeave');
    };

    const handleEmployeeNavigation = () => {
        navigate('/emp');
    };

    return (
        <div className='out-admin' style={{ position: 'relative', padding: '20px' }}>
        
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                <h3>Hello {user.name}</h3>
                <h1 style={{ marginBottom: '30px', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }}>Admin Dashboard</h1>
                <Button
                    variant="contained"
                    onClick={handleTaskNavigation}
                    style={{ marginBottom: '20px', width: '150px' }}
                >
                    Go to Tasks
                </Button>
                <Button
                    variant="contained"
                    onClick={handleLeaveNavigation}
                    style={{ width: '150px' }}
                >
                    Go to Leave
                </Button>

                <Button
                    variant="contained"
                    onClick={handleEmployeeNavigation}
                    style={{ width: '150px', margin: '15px' }}
                >
                    Employees
                </Button>
                <div className='bk-ad'> <BackButton /> </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
