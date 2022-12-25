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
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pick-up',
        validate: {
            notEmpty: true,
            isIn: [['pick-up', 'delivery']]
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

ShippingCostModel.hasMany(shoesTransaction, {foreignKey: 'pickup_staff', as: 'shoes_transaction_pickup'});
shoesTransaction.belongsTo(ShippingCostModel, {foreignKey: 'pickup_staff'});
ShippingCostModel.hasMany(shoesTransaction, {foreignKey: 'delivery_staff', as: 'shoes_transaction_delivery'});
shoesTransaction.belongsTo(ShippingCostModel, {foreignKey: 'delivery_staff'});

export default ShippingCostModel;