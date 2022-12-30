import express from "express";
import {
    getShippingCost,
    getShippingCostById,
    createShippingCost,
    updateShippingCost,
    deleteShippingCost,
    getShippingFormPickup,
    getShippingFormDelivery,
    getSumMilleage,
    getSumMilleageById
} from "../controllers/ShippingCostController.js";

const router = express.Router();

router.get('/shipping-cost', getShippingCost);
router.get('/shipping-cost/list/pickup', getShippingFormPickup);
router.get('/shipping-cost/list/delivery', getShippingFormDelivery);
router.get('/shipping-cost/:id', getShippingCostById);
router.post('/create/shipping-cost', createShippingCost);
router.put('/update/shipping-cost/:id', updateShippingCost);
router.delete('/shipping-cost/:id', deleteShippingCost);

router.get('/shipping-cost/sum/milleage', getSumMilleage);
router.get('/shipping-cost/sum/milleage/:id', getSumMilleageById);


export default router;