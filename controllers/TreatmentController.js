
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
export const getTreatementForm = async (req, res) => {
    const sql = `SELECT id, type AS value, type AS label FROM treatment`

    try {
        const treatmentForm = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(treatmentForm);
    } catch (error) {
        res.status(500).json({ msg: error.message });
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
    const { type, price, description, commision } = req.body;
    try {
        await Treatment.create({
            type: type,
            price: price,
            description: description,
            commision: commision
        });
        res.status(200).json({ msg: "Treatment created successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateTreatment = async (req, res) => {
    const { type, price, description,commision } = req.body;

    const sql = `UPDATE treatment SET type = '${type}', price = '${price}', description = '${description}', commision = '${commision}' WHERE id = ${req.params.id}`;

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