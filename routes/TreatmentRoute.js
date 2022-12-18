import express from "express";
import {
    getTreatment,
    getTreatmentById,
    createTreatment,
    updateTreatment,
    deleteTreatment
} from "../controllers/TreatmentController.js";

const router = express.Router();

router.get('/users', getTreatment);
router.get('/users/:id', getTreatmentById);
router.post('/users', createTreatment);
router.put('/users/:id', updateTreatment);
router.delete('/users/:id', deleteTreatment);

export default router;