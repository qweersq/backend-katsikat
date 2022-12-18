
import ShippingCost from "../models/ShippingCostModel.js";


export const getShippingCost = async (req, res) => {
    try {
        const shippingCost = await ShippingCost.findAll();
        res.json(shippingCost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getShippingCostById = (req, res) => {

}
export const createShippingCost = (req, res) => {

}
export const updateShippingCost = (req, res) => {

}
export const deleteShippingCost = (req, res) => {

}