
import Expenditure from "../models/ExpenditureModel.js";


export const getExpenditure = async (req, res) => {
    try {
        const expenditure = await Expenditure.findAll();
        res.json(expenditure);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getExpenditureById = (req, res) => {

}
export const createExpenditure = (req, res) => {

}
export const updateExpenditure = (req, res) => {

}
export const deleteExpenditure = (req, res) => {

}