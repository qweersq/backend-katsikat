import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import shoesTransaction from "./ShoesTransactionModel.js";

const { DataTypes } = Sequelize;

const TreatmentModel = db.define('treatment', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    commision: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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

TreatmentModel.hasMany(shoesTransaction, {foreignKey: 'treatment_id', as: 'shoesTransaction'});
shoesTransaction.belongsTo(TreatmentModel, {foreignKey: 'treatment_id'});

export default TreatmentModel;