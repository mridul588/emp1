import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import  userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

import cors from 'cors';


const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Route handlers
app.use("/api/user",userRoutes);
app.use("/api/admin",adminRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })