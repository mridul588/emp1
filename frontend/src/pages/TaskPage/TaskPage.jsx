import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TaskPage.css'
import config from '../../utils/config';

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
            const response = await axios.post('https://emp1api-mridul588s-projects.vercel.app/api/user/setTask', taskDetails, { headers });
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
        <>
            <div className='out-task' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <h1 style={{ marginBottom: '10px', fontSize: '26px', fontWeight: '32px', textAlign: 'center' }}>Create Task</h1>
                    <form style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <TextField
                                required
                                variant="outlined"
                                type="text"
                                value={name}
                                onChange={handleInputChange("name")}
                                autoFocus
                                name="name"
                                id="name"
                                className="custom-textfield"
                                placeholder="Enter Name"
                                style={{ width: '350px' }}
                            />
                        </div>
                        <div className="form-group">
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
                        <div className="form-group">
                            <TextField
                                required
                                variant="outlined"
                                type="text"
                                value={checkinTime}
                                onChange={handleInputChange("checkinTime")}
                                name="checkinTime"
                                id="checkinTime"
                                className="custom-textfield"
                                placeholder="Enter Check-in Time"
                                style={{ width: '350px' }}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                required
                                variant="outlined"
                                type="text"
                                value={checkoutTime}
                                onChange={handleInputChange("checkoutTime")}
                                name="checkoutTime"
                                id="checkoutTime"
                                className="custom-textfield"
                                placeholder="Enter Check-out Time"
                                style={{ width: '350px' }}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                required
                                variant="outlined"
                                type="text"
                                value={challenges}
                                onChange={handleInputChange("challenges")}
                                name="challenges"
                                id="challenges"
                                className="custom-textfield"
                                placeholder="Enter Challenges"
                                style={{ width: '350px' }}
                            />
                        </div>
                        <FormControl variant="outlined" style={{ width: '350px' }}>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                id="status"
                                value={status}
                                onChange={handleInputChange("status")}
                                label="Status"
                                className="custom-selectfield"
                            >
                                <MenuItem value={0}>Pending</MenuItem>
                                <MenuItem value={1}>In Progress</MenuItem>
                                <MenuItem value={2}>Completed</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="form-group">
                            <TextField
                                required
                                variant="outlined"
                                type="text"
                                value={monitoredBy}
                                onChange={handleInputChange("monitoredBy")}
                                name="monitoredBy"
                                id="monitoredBy"
                                className="custom-textfield"
                                placeholder="Enter Monitored By"
                                style={{ width: '350px' }}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                required
                                variant="outlined"
                                type="text"
                                value={description}
                                onChange={handleInputChange("description")}
                                name="description"
                                id="description"
                                className="custom-textfield"
                                placeholder="Enter Description"
                                style={{ width: '350px' }}
                            />
                        </div>
                        <div className='btum'>
                        <Button variant="contained" type="submit" name='submit_button' id="create_task_button" style={{ width: '150px', marginTop: '12px' }}>Create Task</Button>
                        <Button variant="contained" onClick={handleWorkClick} style={{ width: '150px', marginTop: '12px' }}>My Task</Button>
                  </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TaskPage;
