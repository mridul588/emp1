import Task from '../models/taskModel.js';
import Leave from '../models/leaveModel.js';
import Work from '../models/workModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

// Task Controller
const setTask = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            email,
            checkinTime,
            checkoutTime,
            challenges,
            status,
            monitoredBy,
            description
        } = req.body;

        const taskData = {
            name,
            email,
            checkinTime,
            checkoutTime,
            challenges,
            status,
            monitoredBy,
            description,
        };

        const newTask = await Task.create(taskData);

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Leave Controller
const setLeave = asyncHandler(async (req, res) => {
    try {
        const { fromDate, toDate, purpose, status, email } = req.body;
        const userId = req.user._id; // Assuming req.user contains the authenticated user

        // Check if user has more than 2 leaves in the current month
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        const leaveCount = await Leave.countDocuments({
            userId: new mongoose.Types.ObjectId(userId),
            fromDate: { $gte: startOfMonth, $lte: endOfMonth }
        });

        if (leaveCount >= 2) {
            return res.status(400).json({ message: "Please mail to lead/admin." });
        }

        const leaveData = {
            userId,
            fromDate,
            toDate,
            purpose,
            status,
            email,
            requestDate: new Date() // Set the request date
        };

        const newLeave = await Leave.create(leaveData);

        res.status(201).json(newLeave);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const getUserLeaves = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user contains the authenticated user

        const leaves = await Leave.find({ userId });

        res.status(200).json(leaves);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const getUserWork = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user contains the authenticated user

        const leaves = await Work.find({ userId });

        res.status(200).json(leaves);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export { setTask, setLeave ,getUserLeaves , getUserWork };
