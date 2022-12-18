import express from "express";
import {
    getExpenditure,
    getExpenditureById,
    createExpenditure,
    updateExpenditure,
    deleteExpenditure
} from "../controllers/ExpenditureController.js";

const router = express.Router();

router.get('/expenditure', getExpenditure);
router.get('/expenditure/:id', getExpenditureById);
router.post('/expenditure', createExpenditure);
router.put('/expenditure/:id', updateExpenditure);
router.delete('/expenditure/:id', deleteExpenditure);

export default router;