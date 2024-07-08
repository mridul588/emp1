import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const WorkModal = ({ userId, onClose }) => {
    const [formData, setFormData] = useState({
        userId,
        description: '',
        deadline: '',
        status: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/work', formData);
            console.log('Work assignment created:', response.data);
            onClose();
        } catch (error) {
            console.error('Error creating work assignment:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <h2>Assign Task</h2>
                    <div>
                        <label>Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Deadline:</label>
                        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value={0}>Incomplete</option>
                            <option value={1}>In Progress</option>
                            <option value={2}>Completed</option>
                        </select>
                    </div>
                    <button type="submit">Create Work Assignment</button>
                </form>
            </div>
        </div>
    );
};

export default WorkModal;
