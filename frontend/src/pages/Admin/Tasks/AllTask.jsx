import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import './style.css';
import config from '../../../utils/config';

const AllTask = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const base_URL = config.backendUrl;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${base_URL}api/admin/seeTask`, { headers });
                
                let tasksData = response.data;
                if (Array.isArray(tasksData)) {
                    const sortedTasks = tasksData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setTasks(sortedTasks);
                } else if (tasksData.tasks && Array.isArray(tasksData.tasks)) {
                    const sortedTasks = tasksData.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setTasks(sortedTasks);
                } else {
                    console.error('Unexpected response format:', tasksData);
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Checkin Time</TableCell>
                        <TableCell>Checkout Time</TableCell>
                        <TableCell>Challenges</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Monitored By</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Created At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task._id}>
                            <TableCell>{task.name}</TableCell>
                            <TableCell>{task.email}</TableCell>
                            <TableCell>{task.checkinTime}</TableCell>
                            <TableCell>{task.checkoutTime}</TableCell>
                            <TableCell>{task.challenges}</TableCell>
                            <TableCell>{task.status === 0 ? 'Not Started' : task.status === 1 ? 'In Progress' : 'Completed'}</TableCell>
                            <TableCell>{task.monitoredBy}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{new Date(task.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AllTask;
