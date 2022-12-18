import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import shoesTransaction from "./ShoesTransactionModel.js";

const { DataTypes } = Sequelize;

const CustomerModel = db.define('customer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    phone: {
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

CustomerModel.hasMany(shoesTransaction, { foreignKey: 'customer_id', as: 'shoesTransaction' });
shoesTransaction.belongsTo(CustomerModel, { foreignKey: 'customer_id' });

export default CustomerModel;