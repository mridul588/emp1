import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';
import './style.css';

const AllLeaves = () => {
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
                const response = await axios.get('http://localhost:5000/api/admin/seeLeaves', { headers });
                setLeaves(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leaves:', error);
                setLoading(false);
            }
        };

        fetchLeaves();
    }, []);

    const handleAccept = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/admin/acceptLeaves/${id}`, {}, { headers });
            setLeaves(leaves.map(leave => leave._id === id ? { ...leave, status: 2 } : leave));
        } catch (error) {
            console.error('Error accepting leave:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/admin/rejectLeaves/${id}`, {}, { headers });
            setLeaves(leaves.map(leave => leave._id === id ? { ...leave, status: 0 } : leave));
        } catch (error) {
            console.error('Error rejecting leave:', error);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>From Date</TableCell>
                            <TableCell>To Date</TableCell>
                            <TableCell>Purpose</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaves.map((leave) => (
                            <TableRow key={leave._id}>
                                <TableCell>{new Date(leave.requestDate).toLocaleDateString()}</TableCell>
                                <TableCell>{leave.userId}</TableCell>
                                <TableCell>{leave.email}</TableCell>
                                <TableCell>{new Date(leave.fromDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(leave.toDate).toLocaleDateString()}</TableCell>
                                <TableCell>{leave.purpose}</TableCell>
                                <TableCell>{leave.status === 0 ? 'Rejected' : leave.status === 1 ? 'Pending' : 'Granted'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleAccept(leave._id)}>Accept</Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleReject(leave._id)} style={{ marginLeft: '10px' }}>Reject</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
       
    );
};

export default AllLeaves;