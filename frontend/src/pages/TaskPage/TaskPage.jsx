import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TaskPage.css';
import config from '../../utils/config';
import BackButton from '../../components/Back/BackButton';

const TaskPage = () => {
    const navigate = useNavigate();
    const base_URL  = config.backendUrl;

    const [taskDetails, setTaskDetails] = useState({
        name: "",
        email: "",
        checkinTime: "",
        checkoutTime: "",
        challenges: "",
        status: 1,
        monitoredBy: "",
        description: "",
    });

    const { name, email, checkinTime, checkoutTime, challenges, status, monitoredBy, description } = taskDetails;

    const handleInputChange = (prop) => (event) => {
        setTaskDetails({
            ...taskDetails,
            [prop]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !email || !checkinTime || !checkoutTime || !challenges || !monitoredBy || !description) {
            alert('Please fill in all fields.');
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.post(`${base_URL}api/user/setTask`, taskDetails, { headers });
            alert('Task created successfully!');
            navigate('/task');
        } catch (error) {
            console.error(error);
            alert('Task creation failed. Please try again.');
        }
    };

    const handleWorkClick = () => {
        navigate('/work');
    };

    return (
        <div>
        <div id="task-form">
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <TextField
                        required
                        variant="outlined"
                        type="text"
                        value={name}
                        onChange={handleInputChange("name")}
                        name="name"
                        id="name"
                        placeholder="Enter Name"
                        fullWidth
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <TextField
                        required
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={handleInputChange("email")}
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        fullWidth
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="checkinTime">Check-in Time:</label>
                    <TextField
                        required
                        variant="outlined"
                        type="text"
                        value={checkinTime}
                        onChange={handleInputChange("checkinTime")}
                        name="checkinTime"
                        id="checkinTime"
                        placeholder="Enter Check-in Time"
                        fullWidth
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="checkoutTime">Check-out Time:</label>
                    <TextField
                        required
                        variant="outlined"
                        type="text"
                        value={checkoutTime}
                        onChange={handleInputChange("checkoutTime")}
                        name="checkoutTime"
                        id="checkoutTime"
                        placeholder="Enter Check-out Time"
                        fullWidth
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="challenges">Challenges:</label>
                    <TextField
                        required
                        variant="outlined"
                        type="text"
                        value={challenges}
                        onChange={handleInputChange("challenges")}
                        name="challenges"
                        id="challenges"
                        placeholder="Enter Challenges"
                        fullWidth
                    />
                </div>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        value={status}
                        onChange={handleInputChange("status")}
                        label="Status"
                    >
                        <MenuItem value={0}>Pending</MenuItem>
                        <MenuItem value={1}>In Progress</MenuItem>
                        <MenuItem value={2}>Completed</MenuItem>
                    </Select>
                </FormControl>
                <div className="form-group">
                    <label htmlFor="monitoredBy">Monitored By:</label>
                    <TextField
                        required
                        variant="outlined"
                        type="text"
                        value={monitoredBy}
                        onChange={handleInputChange("monitoredBy")}
                        name="monitoredBy"
                        id="monitoredBy"
                        placeholder="Enter Monitored By"
                        fullWidth
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <TextField
                        required
                        variant="outlined"
                        type="text"
                        value={description}
                        onChange={handleInputChange("description")}
                        name="description"
                        id="description"
                        placeholder="Enter Description"
                        fullWidth
                    />
                </div>
                <div className="button-group">
                    <Button variant="contained" type="submit" className="task-button">Create Task</Button>
                    <Button variant="contained" onClick={handleWorkClick} className="task-button">My Task</Button>
                </div>
            </form>
        </div>
        <BackButton />
        </div>
    );
};

export default TaskPage;
