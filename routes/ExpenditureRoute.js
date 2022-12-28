import express from "express";
import {
    getExpenditure,
    getExpenditureById,
    createExpenditure,
    updateExpenditure,
    deleteExpenditure,
    getFinanceBox
} from "../controllers/ExpenditureController.js";

const router = express.Router();

router.get('/expenditure', getExpenditure);
router.get('/box/sum', getFinanceBox);
router.get('/expenditure/:id', getExpenditureById);
router.post('/create/expenditure', createExpenditure);
router.put('/update/expenditure/:id', updateExpenditure);
router.delete('/expenditure/:id', deleteExpenditure);

export default router;