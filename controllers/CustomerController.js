
import Customer from "../models/CustomerModel.js";
import db from "../config/Database.js";
import shoesTransaction from "../models/ShoesTransactionModel.js";

export const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findAll({
            include: [
                {
                    model: shoesTransaction,
                    as: "shoes_transaction",
                }]
        });
        res.json(customer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findOne({
            where: { id: req.params.id },
        });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createCustomer = async (req, res) => {
    const { name, phone, address, gender } = req.body;	
    try {
        await Customer.create({
            name: name,
            phone: phone,
            address: address,
            gender: gender,
        });
        res.status(200).json({ msg: "Customer created successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateCustomer = async (req, res) => {
    const { name, phone, address, gender } = req.body;

    const sql = `UPDATE customer SET name = '${name}', phone = '${phone}', address = '${address}', gender = '${gender}' WHERE id = ${req.params.id}`;

    try {
        await db.query(sql, (err, result) => {
            if (err) response(err);
        });
        res.status(200).json({ msg: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const deleteCustomer = (req, res) => {
    const idCustomer = req.params.id;
    const sql = `DELETE FROM customer WHERE id = ${idCustomer}`;
    try {
        db.query(sql, (err, result) => {
            if (err) response(err);
        }
        );
        res.status(200).json({ msg: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}