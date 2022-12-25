
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
export const getShippingFormPickup = async (req, res) => {
    const sql = `SELECT sc.id, s.name, milleage, date FROM shipping_cost sc LEFT JOIN staff s ON s.id = sc.staff_id WHERE type = 'pick-up'`

    try {
        const shippingForm = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(shippingForm);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const getShippingFormDelivery = async (req, res) => {
    const sql = `SELECT sc.id, s.name, milleage, date FROM shipping_cost sc LEFT JOIN staff s ON s.id = sc.staff_id WHERE type = 'delivery'`

    try {
        const shippingForm = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(shippingForm);
    } catch (error) {
        res.status(500).json({ msg: error.message });
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
    const { staff_id, milleage, type, date } = req.body;
    const sql = `SELECT id FROM shipping_cost WHERE type = '${type}' GROUP BY created_at DESC LIMIT 1`
    try {
        await ShippingCost.create({
            staff_id: staff_id,
            milleage: milleage,
            type: type,
            date: date
        });
        const idShippingCost = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(idShippingCost);
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