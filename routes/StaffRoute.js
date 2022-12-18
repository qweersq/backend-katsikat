import express from "express";
import {
    getStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff
} from "../controllers/StaffController.js";

const router = express.Router();

router.get('/staff', getStaff);
router.get('/staff/:id', getStaffById);
router.post('/create/staff', createStaff);
router.put('/update/staff/:id', updateStaff);
router.delete('/staff/:id', deleteStaff);

export default router;