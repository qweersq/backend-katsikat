import express from "express";
import {
    getShippingCost,
    getShippingCostById,
    createShippingCost,
    updateShippingCost,
    deleteShippingCost,
    getShippingFormPickup,
    getShippingFormDelivery
} from "../controllers/ShippingCostController.js";

const router = express.Router();

router.get('/shipping-cost', getShippingCost);
router.get('/shipping-cost/form/pickup', getShippingFormPickup);
router.get('/shipping-cost/form/delivery', getShippingFormDelivery);
router.get('/shipping-cost/:id', getShippingCostById);
router.post('/create/shipping-cost', createShippingCost);
router.put('/update/shipping-cost/:id', updateShippingCost);
router.delete('/shipping-cost/:id', deleteShippingCost);

export default router;