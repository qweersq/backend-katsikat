
import ShippingCost from "../models/ShippingCostModel.js";
import shoesTransaction from "../models/ShoesTransactionModel.js";
import db from "../config/Database.js";


export const getShippingCost = async (req, res) => {
    try {
        const shippingCost = await ShippingCost.findAll({
            include: [
                {
                    model: shoesTransaction,
                    as: "shoes_transaction",
                }]
        });
        res.json(shippingCost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getShippingCostById = async (req, res) => {
    try {
        const shippingCost = await ShippingCost.findOne({
            where: { id: req.params.id },
        });
        res.status(200).json(shippingCost);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createShippingCost = async (req, res) => {
    const { staff_id, milleage, date } = req.body;
    try {
        await ShippingCost.create({
            staff_id: staff_id,
            milleage: milleage,
            date: date
        });
        res.status(200).json({ msg: "ShippingCost created successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateShippingCost = async (req, res) => {
    const { staff_id, milleage, date } = req.body;

    const sql = `UPDATE shipping_cost SET staff_id = '${staff_id}', milleage = '${milleage}', date = '${date}' WHERE id = ${req.params.id}`;

    try {
        await db.query(sql, (err, result) => {
            if (err) response(err);
        });
        res.status(200).json({ msg: "ShippingCost updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const deleteShippingCost = (req, res) => {
    const idShippingCost = req.params.id;
    const sql = `DELETE FROM shipping_cost WHERE id = ${idShippingCost}`;
    try {
        db.query(sql, (err, result) => {
            if (err) response(err);
        }
        );
        res.status(200).json({ msg: "ShippingCost deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}