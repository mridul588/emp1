import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import './Work.css';
import config from '../../utils/config';

const Work = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    const base_URL = config.backendUrl;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
    };

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const response = await axios.get(`${base_URL}api/user/getWork`, { headers });
                const worksData = response.data;

                if (Array.isArray(worksData)) {
                    setWorks(worksData);
                } else {
                    console.error('Unexpected response format:', worksData);
                    setWorks([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching works:', error);
                setLoading(false);
            }
        };

        fetchWorks();
    }, [base_URL, headers]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className='out'>
            <TableContainer component={Paper}>
                <h3>Your Assigned Work</h3>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Deadline</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Assigned Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {works.map((work) => (
                            <TableRow key={work._id}>
                                <TableCell>{work.description}</TableCell>
                                <TableCell>{new Date(work.deadline).toLocaleDateString()}</TableCell>
                                <TableCell>{work.status === 0 ? 'Incomplete' : work.status === 1 ? 'In Progress' : 'Completed'}</TableCell>
                                <TableCell>{new Date(work.assignedDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Work;
