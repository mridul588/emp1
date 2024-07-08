import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"; 
import generateToken from "../config/generateToken.js"; // Updated path to config
//import { resetTemplate } from "../utils/email/template/resetPassword.js"; // Fixed typo in the file name
//import { Resend } from "resend";
import Task from "../models/taskModel.js";
import Leave from "../models/leaveModel.js";
import Work from "../models/workModel.js"

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

// Authenticate a user
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPasswords(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

export const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find(); // Retrieve all documents from the 'Task' collection
        res.status(200).json(allTasks); // Respond with the retrieved documents in JSON format
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" }); // Handle errors if any occur
    }
};


export const getAllPendingTasks = async (req, res) => {
    try {
        const allPendingTasks = await Task.find({ status: 0 }); // Retrieve tasks where status is 0 (pending)
        res.status(200).json(allPendingTasks); // Respond with the retrieved pending tasks in JSON format
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" }); // Handle errors if any occur
    }
};

export const getAllLeaves = async (req, res) => {
    try {
        const allLeaves = await Leave.find().sort({ fromDate: -1 }); // Sort by fromDate in descending order
        res.status(200).json(allLeaves); // Respond with the retrieved leaves in JSON format
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" }); // Handle errors if any occur
    }
};


export const acceptLeave = async (req, res) => {
    const { id } = req.params; // Extracting the leaveId from req.params.id
    try {
        const Leave1 = await Leave.findByIdAndUpdate(id, { status: 2 }, { new: true });

        if (!Leave1) {
            return res.status(404).json({ error: "Leave not found" });
        }

        res.status(200).json(Leave1);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const rejectLeave = async (req, res) => {
    const { id } = req.params; // Assuming leaveId is passed as a URL parameter
    try {
        const Leave1 = await Leave.findByIdAndUpdate(id, { status: 1 }, { new: true });

        if (!Leave1) {
            return res.status(404).json({ error: "Leave not found" });
        }

        res.status(200).json(Leave1);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getAllEmployees = async (req, res) => {
    try {
        const allEmployees = await User.find();
        res.status(200).json(allEmployees); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" }); // Handle errors if any occur
    }
};

export const createWork = async (req, res) => {
    try {
        const { userId, description, deadline, status } = req.body;

        const newWork = new Work({
            userId,
            description,
            deadline,
            status
        });

        const savedWork = await newWork.save();
        res.status(201).json(savedWork);
    } catch (error) {
        res.status(500).json({ message: 'Error creating work assignment', error });
    }
};


