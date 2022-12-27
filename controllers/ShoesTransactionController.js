
import ShoesTransaction from "../models/ShoesTransactionModel.js";
import db from "../config/Database.js";
import response from "../response.js";


export const getShoesTransaction = async (req, res) => {
    try {
        const shoes_transaction = await ShoesTransaction.findAll();
        res.json(shoes_transaction);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
    }
}

export const getDashboardData = async (req, res) => {
    const sql = `SELECT
    SUM(CASE WHEN status = 'received' THEN 1 ELSE 0 END) AS received,
    SUM(CASE WHEN status = 'process' THEN 1 ELSE 0 END) AS process,
    SUM(CASE WHEN status = 'ready' THEN 1 ELSE 0 END) AS ready,
    SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) AS done,
    COUNT(DISTINCT customer_id) AS new_customer,
    COUNT(id)-COUNT(DISTINCT customer_id) AS repeat_order,
    SUM(CASE WHEN status = 'pick-up' THEN 1 ELSE 0 END) AS pick_up,
    COUNT(CASE WHEN due_date = CURRENT_DATE THEN 1 ELSE NULL END) AS must_done
FROM shoes_transaction`

    try {
        const dashboardData = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(dashboardData);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getOrderList = async (req, res) => {
    const sql = `SELECT DISTINCT st.id, st.status, c.name, tr.type as treatment, c.address, s.type, COALESCE(sf1.name, 'Not Yet Pickup') AS pickup_staff, COALESCE(sf2.name, 'Not Yet Delivery') AS delivery_staff,COALESCE(sf.name, 'Belum ada pencuci') AS cleaner, st.pickup_date, st.due_date 
    FROM shoes_transaction st 
    LEFT JOIN customer c ON c.id = st.customer_id 
    LEFT JOIN treatment tr ON tr.id = st.treatment_id 
    LEFT JOIN shoes s ON s.id = st.shoes_id 
    LEFT JOIN staff sf ON sf.id = st.staff_id 
    LEFT JOIN shipping_cost sp ON sp.id = st.pickup_staff
    LEFT JOIN shipping_cost sp1 ON sp1.id = st.delivery_staff
    LEFT JOIN staff sf1 ON sf1.id = sp.staff_id
    LEFT JOIN staff sf2 ON sf2.id = sp1.staff_id`

    try {
        const orderList = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(orderList);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const getBoxDataOperasional = async (req, res) => {
    const sql = `SELECT COUNT(id) AS countBox FROM shipping_cost UNION ALL SELECT COUNT(id) FROM staff UNION ALL SELECT COUNT(id) FROM treatment UNION ALL SELECT COUNT(id) FROM shoes UNION ALL SELECT COUNT(id) FROM customer`

    try {
        const boxData = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(boxData);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getAllForeignKeyById = async (req, res) => {
    const id  = req.params.id;
    const sql = `SELECT st.id, st.customer_id, st.shoes_id, st.staff_id, st.treatment_id, st.pickup_staff, st.delivery_staff, st.status, st.payment, st.pickup_date, st.due_date, cs.id as id_customer, cs.name as name_customer, cs.phone as phone_customer, cs.address as address_customer, cs.gender as gender_customer, sh.id as id_shoes, sh.type as type_shoes, tr.id as id_treatment, tr.type as type_treatment, tr.price as price_treatment, tr.description as desc_treatment, scp.id as id_sc_pickup, scp.staff_id as staffid_sc_pickup, stp.name as name_staff_pickup, scp.milleage as milleage_sc_pickup, scp.type as type_sc_pickup, scp.date as date_sc_pickup, scd.id as id_sc_delivery, scd.staff_id as staffid_sc_delivery, std.name as name_staff_delivery, scd.milleage as milleage_sc_delivery, scd.type as type_sc_delivery, scd.date as date_sc_delivery, stc.id as id_staff, stc.name as name_staff, stc.phone as phone_staff, stc.address as address_staff, stc.gender as gender_staff FROM shoes_transaction st
    LEFT JOIN customer cs ON cs.id = st.customer_id
    LEFT JOIN shoes sh ON sh.id = st.shoes_id 
    LEFT JOIN treatment tr ON tr.id = st.treatment_id
    LEFT JOIN shipping_cost scp ON scp.id = st.pickup_staff
    LEFT JOIN shipping_cost scd ON scd.id = st.delivery_staff
    LEFT JOIN staff stc ON stc.id = st.staff_id
    LEFT JOIN staff stp ON stp.id = scp.staff_id
    LEFT JOIN staff std ON std.id = scd.staff_id
    WHERE st.id = '${id}'`

    try {
        const getAllForeignKeyId = await db.query(sql, { type: db.QueryTypes.SELECT });
        res.status(200).json(getAllForeignKeyId);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const getShoesTransactionById = async (req, res) => {
    try {
        const shoes_transaction = await ShoesTransaction.findOne({
            where: { id: req.params.id },
        });
        res.status(200).json(shoes_transaction);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createShoesTransaction = async (req, res) => {
    const { customer_id, shoes_id, staff_id, treatment_id, pickup_staff, delivery_staff, status, pickup_date, due_date } = req.body;
    try {
        await ShoesTransaction.create({
            customer_id: customer_id,
            shoes_id: shoes_id,
            staff_id: staff_id,
            treatment_id: treatment_id,
            pickup_staff: pickup_staff,
            delivery_staff: delivery_staff,
            status: status,
            pickup_date: pickup_date,
            due_date: due_date,
        });
        res.status(200).json({ msg: "ShoesTransaction created successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const updateShoesTransaction = async (req, res) => {
    const { customer_id, shoes_id, staff_id, treatment_id, pickup_staff, delivery_staff, status, pickup_date, due_date } = req.body;

    const sql = `UPDATE shoes_transaction SET customer_id = '${customer_id}', shoes_id = '${shoes_id}', staff_id = '${staff_id}', treatment_id = '${treatment_id}',pickup_staff = '${pickup_staff}',delivery_staff = '${delivery_staff}', status = '${status}', pickup_date = '${pickup_date}', due_date = '${due_date}' WHERE id = ${req.params.id}`;

    try {
        await db.query(sql, (err, result) => {
            if (err) response(err);
        });
        res.status(200).json({ msg: "ShoesTransaction update successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const deleteShoesTransaction = (req, res) => {
    const idShoesTransaction = req.params.id;
    const sql = `DELETE FROM shoes_transaction WHERE id = ${idShoesTransaction}`;
    try {
        db.query(sql, (err, result) => {
            if (err) response(err);
        });
        res.status(200).json({ msg: "ShoesTransaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}