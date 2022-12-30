
import Staff from "../models/StaffModel.js";
import ShippingCost from "../models/ShippingCostModel.js";
import db from "../config/Database.js";
import { response } from "express";


export const getStaff = async (req, res) => {
    try {
        const staff = await Staff.findAll();
        res.json(staff);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}

export const getStaffForm = async (req, res) => {
    const sql = `SELECT id, name AS value, name AS label FROM staff`

    try {
        const staffForm = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(staffForm);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getStaffFormById = async (req, res) => {
    try {
        const staff = await Staff.findOne({
            where: { id: req.params.id },
        });
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findOne({
            where: { id: req.params.id },
        });
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createStaff = async (req, res) => {
    const { name, phone, address, gender } = req.body;
    try {
        await Staff.create({
            name: name,
            phone: phone,
            address: address,
            gender: gender
        });
        res.status(200).json({ msg: "Staff created successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateStaff = async (req, res) => {

    const { name, phone, address, gender } = req.body;
    const sql = `UPDATE staff SET name = '${name}', phone = '${phone}', address = '${address}', gender = '${gender}' WHERE id = ${req.params.id}`;

    try {
        await db.query(sql, (err, result) => {
            if (err) response(err);
        });
        res.status(200).json({ msg: "Staff updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const deleteStaff = async (req, res) => {
    const idStaff = req.params.id;
    const sql = `DELETE FROM staff WHERE id = ${idStaff}`;
    try {
        db.query(sql, (err, result) => {
            if (err) response(err);
        }
        );
        res.status(200).json({ msg: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const getStaffCount = async (req, res) => {
    const sql = `SELECT COUNT(id) AS count_staff FROM staff`

    try {
        const staffCount = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(staffCount[0]);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}