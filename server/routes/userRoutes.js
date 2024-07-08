import express from "express";
import { authUser, getAllLeaves} from "../controller/adminController.js";
import { setTask,  setLeave, getUserLeaves , getUserWork} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

 router.post('/login',authUser);
 router.post('/setTask',setTask);
 router.post('/leave',protect,setLeave);
 router.get('/getleaves',protect , getUserLeaves);
 router.get('/getWork',protect , getUserWork);

export default router;