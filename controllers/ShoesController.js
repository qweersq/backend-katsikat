
import Shoes from "../models/ShoesModel.js";
import db from "../config/Database.js";

export const getShoes = async (req, res) => {
    try {
        const shoes = await Shoes.findAll();
        res.json(shoes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}

export const getShoesForm = async (req, res) => {
    const sql = `SELECT type AS value, type AS label FROM shoes`

    try {
        const shoesForm = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(shoesForm);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const getShoesById = async (req, res) => {
    try {
        const shoes = await Shoes.findOne({
            where: { id: req.params.id },});
        res.status(200).json(shoes);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createShoes = async (req, res) => {
    const { type } = req.body;
    try {
        await Shoes.create({
            type: type,
        });
        res.status(200).json({ msg: "Shoes created successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateShoes = async (req, res) => {

    const { type } = req.body;
    const sql = `UPDATE shoes SET type = '${type}' WHERE id = ${req.params.id}`;

    try {
        await db.query(sql, (err, result) => {
            if (err) response(err);
        });
        res.status(200).json({ msg: "Shoes updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const deleteShoes = async (req, res) => {
    const idShoes = req.params.id;
    const sql = `DELETE FROM shoes WHERE id = ${idShoes}`;
    try {
        db.query(sql, (err, result) => {
            if (err) response(err);
        }
        );
        res.status(200).json({ msg: "Shoes deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}