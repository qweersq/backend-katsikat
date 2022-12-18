
import ShoesTransaction from "../models/ShoesTransactionModel.js";


export const getShoesTransaction = async (req, res) => {
    try {
        const shoes_transaction = await ShoesTransaction.findAll();
        res.json(shoes_transaction);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getShoesTransactionById = (req, res) => {

}
export const createShoesTransaction = (req, res) => {

}
export const updateShoesTransaction = (req, res) => {

}
export const deleteShoesTransaction = (req, res) => {

}