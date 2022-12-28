
import Expenditure from "../models/ExpenditureModel.js";
import db from "../config/Database.js";


export const getExpenditure = async (req, res) => {
    const sql = `SELECT exp.id, exp.name AS item_name, exp.staff_id, sf.name AS staff_name, exp.price, exp.description, exp.date, exp.files from expenditure exp
    LEFT JOIN staff sf ON sf.id = exp.staff_id`
    try {
        const expenditureList = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(expenditureList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getFinanceBox = async (req, res) => {
    const sql = `SELECT 'sales' as type, SUM(tr.price) as amount FROM shoes_transaction st LEFT JOIN treatment tr ON tr.id = st.treatment_id UNION ALL SELECT 'amountExp' as type, SUM(price) as amount FROM expenditure UNION ALL SELECT 'balanceSaldo' as type, ( (SELECT SUM(tr.price) FROM shoes_transaction st LEFT JOIN treatment tr ON tr.id = st.treatment_id) - (SELECT SUM(price) FROM expenditure) ) as amount`
    try {
        const financeBox = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(financeBox);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}
export const getExpenditureById = async (req, res) => {
    try {
        const expenditure = await Expenditure.findOne({
            where: { id: req.params.id },
        });
        res.status(200).json(expenditure);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createExpenditure = async (req, res) => {
    const { name, price, staff_id, description, date, files } = req.body;
    try {
        await Expenditure.create({
            name: name,
            price: price,
            staff_id: staff_id,
            description: description,
            date: date,
            files: files
        });
        res.status(200).json({ msg: "Expenditure created successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateExpenditure = async (req, res) => {
    const { name, price, staff_id, description, date, files } = req.body;

    const sql = `UPDATE expenditure SET name = '${name}', price = '${price}', staff_id = '${staff_id}' description = '${description}', date = '${date}', files = '${files}' WHERE id = ${req.params.id}`;

    try {
        await db.query(sql, (err, result) => {
            if (err) response(err);
        });
        res.status(200).json({ msg: "Expenditure updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const deleteExpenditure = (req, res) => {
    const idExpenditure = req.params.id;
    const sql = `DELETE FROM expenditure WHERE id = ${idExpenditure}`;
    try {
        db.query(sql, (err, result) => {
            if (err) response(err);
        }
        );
        res.status(200).json({ msg: "Expenditure deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}