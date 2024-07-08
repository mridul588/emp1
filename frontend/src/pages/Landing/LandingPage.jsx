import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import sampleImage from "../../assets/img.png"; // replace with the actual path to your image
import { motion } from "framer-motion";
import { fadeIn } from './compo/variant.js';
import logo from "../../assets/logo.png";
import './LandingPage.css'
const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <>
        <div className='out'>
            <AppBar position="static" style={{ background: 'none', width:'1360px'}}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <div>
                    <img src={logo} style={{ width: '100px', height: 'auto' }} alt="Logo" />
                        
                    </div>
                    <Typography variant="h6">
                    <Button 
                     variant="contained"
                                color="primary"
                                size="large"
                                style={{ marginTop: '20px' }}
                                onClick={handleLogin}
                    >Login</Button>
                    </Typography>
                    
                </Toolbar>
                
            </AppBar>
            <Container maxWidth="lg" style={{ marginTop: '50px', minHeight: 'calc(100vh - 64px)' }}>
            
            <Grid container spacing={4} alignItems="center" style={{ minHeight: '100vh' }}>
            <div className='adjust'>
            <motion.div
            variants={fadeIn('right', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.3 }}
                    className='middle'
            >
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h1" component="h1" gutterBottom style={{ fontWeight: 'bold', fontSize: '35px' }}>
                        Welcome to Pyramid AI Hub
                        </Typography>
                        <Typography variant="h1" component="h1" gutterBottom style={{ fontWeight: 'bold', fontSize: '33px', color: '#1976d2' }}>
                        Access your employee data with ease
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            style={{ marginTop: '20px' }}
                            onClick={handleLogin}
                        >
                            Get Started
                        </Button>
                    </Box>
                </Grid>
                </motion.div>
                <motion.div
                variants={fadeIn('left', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.3 }}
                    className='middle'
                >
                <Grid item xs={15} md={6}>
                    <Box style={{ width: '740px' , height: '50vh'}}>
                    <div className='img1'>
                    <img src={sampleImage} alt="Sample" style={{ width: '100%', height: 'auto' }} />
                    </div>
                    </Box>
                </Grid>
                </motion.div>
                </div>
            </Grid>
        </Container>
            
            </div>
        </>
    );
};

export default LandingPage;
