import express from "express";
import {
    getCustomer,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getName
} from "../controllers/CustomerController.js";

const router = express.Router();

router.get('/customer', getCustomer);
router.get('/customer/name', getName);
router.get('/customer/:id', getCustomerById);
router.post('/create/customer', createCustomer);
router.put('/update/customer/:id', updateCustomer);
router.delete('/customer/:id', deleteCustomer);

export default router;