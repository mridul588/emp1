import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
                backgroundColor: 'dodgerblue',
                color: 'white',
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '5px',
                textTransform: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    backgroundColor: 'deepskyblue',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                },
            }}
        >
            Back
        </Button>
    );
};

export default BackButton;
