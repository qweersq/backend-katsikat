
import Shoes from "../models/ShoesModel.js";


export const getShoes = async (req, res) => {
    try {
        const shoes = await Shoes.findAll();
        res.json(shoes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getShoesById = (req, res) => {

}
export const createShoes = (req, res) => {

}
export const updateShoes = (req, res) => {

}
export const deleteShoes = (req, res) => {

}