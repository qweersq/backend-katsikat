import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import shoesTransaction from "./ShoesTransactionModel.js";

const { DataTypes } = Sequelize;


const ShippingCostModel = db.define('shipping_cost', {
    staff_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    milleage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
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

ShippingCostModel.hasMany(shoesTransaction, {foreignKey: 'shipping_id', as: 'shoes_transaction'});
shoesTransaction.belongsTo(ShippingCostModel, {foreignKey: 'shipping_id'});

export default ShippingCostModel;