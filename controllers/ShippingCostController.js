
import ShippingCost from "../models/ShippingCostModel.js";
import shoesTransaction from "../models/ShoesTransactionModel.js";
import db from "../config/Database.js";


export const getShippingCost = async (req, res) => {
    const sql = `SELECT sc.id, sc.staff_id, st.name, sc.milleage, sc.type, sc.date FROM shipping_cost sc LEFT JOIN staff st ON st.id = sc.staff_id`
    try {
        const shippingList = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(shippingList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getShippingFormPickup = async (req, res) => {
    const sql = `SELECT sc.id, s.name, milleage, date FROM shipping_cost sc LEFT JOIN staff s ON s.id = sc.staff_id WHERE type = 'pick-up' GROUP BY sc.created_at DESC`

    try {
        const shippingForm = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(shippingForm);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const getShippingFormDelivery = async (req, res) => {
    const sql = `SELECT sc.id, s.name, milleage, date FROM shipping_cost sc LEFT JOIN staff s ON s.id = sc.staff_id WHERE type = 'delivery' GROUP BY sc.created_at DESC`

    try {
        const shippingForm = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(shippingForm);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const getShippingCostById = async (req, res) => {
    const id = req.params.id;
    const sql = `SELECT sc.id, sc.staff_id, st.name, sc.milleage, sc.type, sc.date FROM shipping_cost sc LEFT JOIN staff st ON st.id = sc.staff_id WHERE sc.id = '${id}'`
    try {
        const shippingCostDataById = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(shippingCostDataById[0]);
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
    const { staff_id, milleage, type, date } = req.body;

    const sql = `UPDATE shipping_cost SET staff_id = '${staff_id}', milleage = '${milleage}',type = '${type}', date = '${date}' WHERE id = ${req.params.id}`;

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