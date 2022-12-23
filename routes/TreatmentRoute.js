import express from "express";
import {
    getTreatment,
    getTreatmentById,
    createTreatment,
    updateTreatment,
    deleteTreatment,
    getTreatementForm
} from "../controllers/TreatmentController.js";

const router = express.Router();

router.get('/treatments', getTreatment);
router.get('/treatments/form', getTreatementForm);
router.get('/treatment/:id', getTreatmentById);
router.post('/create/treatment', createTreatment);
router.put('/update/treatment/:id', updateTreatment);
router.delete('/treatment/:id', deleteTreatment);

export default router;