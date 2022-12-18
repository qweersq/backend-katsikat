
import Treatment from "../models/TreatmentModel.js";
import db from "../config/Database.js";


export const getTreatment = async (req, res) => {
    try {
        const treatment = await Treatment.findAll();
        res.json(treatment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getTreatmentById = async (req, res) => {
    try {
        const treatment = await Treatment.findOne({
            where: { id: req.params.id },
        });
        res.status(200).json(treatment);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createTreatment = async (req, res) => {
    const { type, price, description } = req.body;
    try {
        await Treatment.create({
            type: type,
            price: price,
            description: description
        });
        res.status(200).json({ msg: "Treatment created successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateTreatment = async (req, res) => {
    const { type, price, description } = req.body;

    const sql = `UPDATE treatment SET type = '${type}', price = '${price}', description = '${description}' WHERE id = ${req.params.id}`;

    try {
        await db.query(sql, (err, result) => {
            if (err) response(err);
        });
        res.status(200).json({ msg: "Treatment updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const deleteTreatment = (req, res) => {
    const idTreatment = req.params.id;
    const sql = `DELETE FROM treatment WHERE id = ${idTreatment}`;
    try {
        db.query(sql, (err, result) => {
            if (err) response(err);
        }
        );
        res.status(200).json({ msg: "Treatment deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}