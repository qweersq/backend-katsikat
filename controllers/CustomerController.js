
import Customer from "../models/CustomerModel.js";


export const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findAll();
        res.json(customer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getCustomerById = (req, res) => {

}
export const createCustomer = (req, res) => {

}
export const updateCustomer = (req, res) => {

}
export const deleteCustomer = (req, res) => {

}