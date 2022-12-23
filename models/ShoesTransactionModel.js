import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const { DataTypes } = Sequelize;

const ShoesTransactionModel = db.define('shoes_transaction', {
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    shoes_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    staff_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    treatment_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    pickup_staff : {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    delivery_staff : {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pick-up',
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['received', 'process', 'ready', 'done']]
        }
    },
    payment: {
        type: DataTypes.STRING,
        defaultValue: 'cash',
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['cash', 'transfer', 'e-wallet']]
        }
    },
    pickup_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    due_date: {
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




export default ShoesTransactionModel;