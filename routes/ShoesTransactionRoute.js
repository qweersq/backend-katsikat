import express from "express";
import {
    getShoesTransaction,
    getShoesTransactionById,
    createShoesTransaction,
    updateShoesTransaction,
    deleteShoesTransaction,
    getOrderList,
    getDashboardData,
    getAllForeignKeyById,
    getBoxDataOperasional,
    getSalesShoesTransaction,
    getSalesShoesTransactionById,
    putSalesShoesTransactionById
} from "../controllers/ShoesTransactionController.js";

const router = express.Router();

router.get('/shoes-transaction', getShoesTransaction);
router.get('/order/shoes-transaction', getOrderList);
router.get('/data/shoes-transaction', getDashboardData);
router.get('/data/count/operasional', getBoxDataOperasional);
router.get('/all/foreignkey/shoes-transaction/:id', getAllForeignKeyById);
router.get('/shoes-transaction/:id', getShoesTransactionById);
router.post('/create/shoes-transaction', createShoesTransaction);
router.put('/update/shoes-transaction/:id', updateShoesTransaction);
router.delete('/shoes-transaction/:id', deleteShoesTransaction);


router.get('/finance/sales/shoes-transaction', getSalesShoesTransaction);
router.get('/finance/sales/shoes-transaction/:id', getSalesShoesTransactionById);
router.put('/finance/sales/shoes-transaction/:id', putSalesShoesTransactionById);


export default router;