import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import shipping from "./ShippingCostModel.js";
import expediture from "./ExpenditureModel.js";
import shoesTransaction from "./ShoesTransactionModel.js";


const { DataTypes } = Sequelize;

const StaffModel = db.define('staff', {
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    phone : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10, 15]
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'none',
        validate: {
            notEmpty: true,
            isIn: [['none', 'male', 'female']]
        }
    },

    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    update_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true,
    timestamps: false

});    

StaffModel.hasMany(shipping, {foreignKey: 'staff_id', as: 'shipping_cost'});
shipping.belongsTo(StaffModel, {foreignKey: 'staff_id'});

StaffModel.hasMany(expediture, {foreignKey: 'staff_id', as: 'expenditure'});
expediture.belongsTo(StaffModel, {foreignKey: 'staff_id'});

StaffModel.hasMany(shoesTransaction, {foreignKey: 'staff_id', as: 'shoesTransaction'});
shoesTransaction.belongsTo(StaffModel, {foreignKey: 'staff_id'});


export default StaffModel;