import express from "express";
import {
    getShoesTransaction,
    getShoesTransactionById,
    createShoesTransaction,
    updateShoesTransaction,
    deleteShoesTransaction,
    getOrderList
} from "../controllers/ShoesTransactionController.js";

const router = express.Router();

router.get('/shoes-transaction', getShoesTransaction);
router.get('/order/shoes-transaction', getOrderList);
router.get('/shoes-transaction/:id', getShoesTransactionById);
router.post('/create/shoes-transaction', createShoesTransaction);
router.put('/update/shoes-transaction/:id', updateShoesTransaction);
router.delete('/shoes-transaction/:id', deleteShoesTransaction);

export default router;