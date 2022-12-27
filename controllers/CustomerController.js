
import Customer from "../models/CustomerModel.js";
import db from "../config/Database.js";

export const getCustomer = async (req, res) => {
    const sql = `SELECT * FROM customer`
    try {
        const customer = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(customer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getName = async (req, res) => {
    const sql = `SELECT id, name FROM customer GROUP BY name ASC`

    try {
        const name = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(name);
    } catch (error) {
        res.status(500).json({ msg: error.message });
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
    const sql = `SELECT id FROM customer WHERE name = '${name}' AND phone = '${phone}' AND address = '${address}'`
    try {
        await Customer.create({
            name: name,
            phone: phone,
            address: address,
            gender: gender,
        });
        const idCustomer = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(idCustomer);
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