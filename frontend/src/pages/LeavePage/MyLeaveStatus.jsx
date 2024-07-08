import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import './MyLeaveStatus.css';

const MyLeaveStatus = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
    };

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/getleaves', { headers });
                const sortedLeaves = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setLeaves(sortedLeaves);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leaves:', error);
                setLoading(false);
            }
        };

        fetchLeaves();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className='out'>
        <TableContainer component={Paper}>
        <h3>Your aplications</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>From Date</TableCell>
                        <TableCell>To Date</TableCell>
                        <TableCell>Purpose</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Requested At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leaves.map((leave) => (
                        <TableRow key={leave._id}>
                            <TableCell>{new Date(leave.fromDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(leave.toDate).toLocaleDateString()}</TableCell>
                            <TableCell>{leave.purpose}</TableCell>
                            <TableCell>{leave.status === 0 ? 'Rejected' : leave.status === 1 ? 'Pending' : 'Granted'}</TableCell>
                            <TableCell>{new Date(leave.requestDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
};

export default MyLeaveStatus;
