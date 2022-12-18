
import ShoesTransaction from "../models/ShoesTransactionModel.js";
import db from "../config/Database.js";


export const getShoesTransaction = async (req, res) => {
    try {
        const shoes_transaction = await ShoesTransaction.findAll();
        res.json(shoes_transaction);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getShoesTransactionById = async (req, res) => {
    try {
        const shoes_transaction = await ShoesTransaction.findOne({
            where: { id: req.params.id },
        });
        res.status(200).json(shoes_transaction);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createShoesTransaction = async (req, res) => {
    const { customer_id, shoes_id, staff_id, treatment_id, shipping_id, pickup_date, due_date } = req.body;	
    try {
        await ShoesTransaction.create({
            customer_id: customer_id,
            shoes_id: shoes_id,
            staff_id: staff_id,
            treatment_id: treatment_id,
            shipping_id: shipping_id,
            pickup_date: pickup_date,
            due_date: due_date
        });
        res.status(200).json({ msg: "ShoesTransaction created successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateShoesTransaction = async (req, res) => {
    const { customer_id, shoes_id, staff_id, treatment_id, shipping_id, pickup_date, due_date } = req.body;

    const sql = `UPDATE shoes_transaction SET customer_id = '${customer_id}', shoes_id = '${shoes_id}', staff_id = '${staff_id}', treatment_id = '${treatment_id}', shipping_id = '${shipping_id}', pickup_date = '${pickup_date}', due_date = '${due_date}' WHERE id = ${req.params.id}`;

    try {
        await db.query(sql, (err, result) => {
            if (err) response(err);
        });
        res.status(200).json({ msg: "ShoesTransaction upshipping_idd successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const deleteShoesTransaction = (req, res) => {
    const idShoesTransaction = req.params.id;
    const sql = `DELETE FROM shoes_transaction WHERE id = ${idShoesTransaction}`;
    try {
        db.query(sql, (err, result) => {
            if (err) response(err);
        }
        );
        res.status(200).json({ msg: "ShoesTransaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}