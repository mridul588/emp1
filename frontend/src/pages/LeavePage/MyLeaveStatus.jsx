import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import './MyLeaveStatus.css';
import config from '../../utils/config';
import BackButton from '../../components/Back/BackButton';

const MyLeaveStatus = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
    };

    const base_URL = config.backendUrl;

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get(`${base_URL}api/user/getleaves`, { headers });
                const leavesData = response.data;

                if (Array.isArray(leavesData)) {
                    const sortedLeaves = leavesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setLeaves(sortedLeaves);
                } else {
                    console.error('Unexpected response format:', leavesData);
                    setLeaves([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leaves:', error);
                setLoading(false);
            }
        };

        fetchLeaves();
    }, [base_URL, headers]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
        <div className='yo'>
        <BackButton /> 
        </div>
        <div className='out-leavestatus'>
            <TableContainer component={Paper}>
                <h3>Your Applications</h3>
                <Table className='tableleave'>
                    <TableHead className='Theadleave'>
                        <TableRow className='trowleave'>
                            <TableCell>From Date</TableCell>
                            <TableCell>To Date</TableCell>
                            <TableCell>Purpose</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Requested At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaves.map((leave) => (
                            <TableRow key={leave._id} className='trowleave'>
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
        </div>
    );
};

export default MyLeaveStatus;
