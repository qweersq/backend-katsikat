import express from "express";
import {
    getShoes,
    getShoesById,
    createShoes,
    updateShoes,
    deleteShoes,
    getShoesForm
} from "../controllers/ShoesController.js";

const router = express.Router();

router.get('/shoes', getShoes);
router.get('/shoes/list', getShoesForm);
router.get('/shoes/:id', getShoesById);
router.post('/create/shoes', createShoes);
router.put('/update/shoes/:id', updateShoes);
router.delete('/shoes/:id', deleteShoes);

export default router;