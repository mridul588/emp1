import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [exist, setExist] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
            setExist(true);
        }
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setExist(false);
        navigate('/');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        Prism
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {/* You can add some text or logo here */}
                    </Typography>
                    {exist ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" onClick={handleLogin}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
