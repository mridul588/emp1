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

// const corsOptions ={
//   origin:'https://emp1-80h395n1l-mridul588s-projects.vercel.app/', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
app.use(cors('*'));
app.use(express.json());


// Route handlers
app.use("/api/user",userRoutes);
app.use("/api/admin",adminRoutes);

const NODE_ENV = "production";
const __currdir = path.resolve();
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__currdir, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__currdir, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    return res.send("API is running!");
  });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })