import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkFormModal from './WorkModal';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/getAllEmployees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleAssignTaskClick = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const AddEmp = () => {
        navigate("/signup");
    }

    return (
        <div>
            <h1>Employee List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        {/* <th>Team</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            {/* <td>{employee.team}</td> */}
                            <td>
                                <button onClick={() => handleAssignTaskClick(employee._id)}>
                                    Assign Task
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Button
                variant="contained"
                onClick={AddEmp}
                style={{ width: '150px', margin: '15px' }}
            >
                 Add employees
            </Button>
            {showModal && (
                <WorkFormModal
                    userId={selectedUserId}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default EmployeeTable;
