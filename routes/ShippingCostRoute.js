import express from "express";
import {
    getShippingCost,
    getShippingCostById,
    createShippingCost,
    updateShippingCost,
    deleteShippingCost
} from "../controllers/ShippingCostController.js";

const router = express.Router();

router.get('/shipping-cost', getShippingCost);
router.get('/shipping-cost/:id', getShippingCostById);
router.post('/shipping-cost', createShippingCost);
router.put('/shipping-cost/:id', updateShippingCost);
router.delete('/shipping-cost/:id', deleteShippingCost);

export default router;