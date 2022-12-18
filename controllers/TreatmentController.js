
import Treatment from "../models/TreatmentModel.js";


export const getTreatment = async (req, res) => {
    try {
        const treatment = await Treatment.findAll();
        res.json(treatment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getTreatmentById = (req, res) => {

}
export const createTreatment = (req, res) => {

}
export const updateTreatment = (req, res) => {

}
export const deleteTreatment = (req, res) => {

}