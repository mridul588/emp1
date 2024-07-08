import express from "express";
import {registerUser , authUser, getAllTasks, getAllPendingTasks, getAllLeaves, acceptLeave, rejectLeave, getAllEmployees, createWork} from "../controller/adminController.js";
import { protect , adminCheck } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup',registerUser);
router.get('/seeTask' , protect , adminCheck ,getAllTasks);
router.get('/pendingTask' , getAllPendingTasks);
router.get('/getAllEmployees',getAllEmployees);
router.get('/seeLeaves',protect , adminCheck ,  getAllLeaves);
router.post('/acceptLeaves/:id',acceptLeave);
router.post('/rejectLeaves/:id',rejectLeave);
router.post('/work', createWork)


export default router;