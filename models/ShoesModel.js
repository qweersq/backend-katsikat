import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import shoesTransaction from "./ShoesTransactionModel.js";


const { DataTypes } = Sequelize;

const ShoesModel = db.define('shoes', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
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

ShoesModel.hasMany(shoesTransaction, {foreignKey: 'shoes_id', as: 'shoesTransaction'});
shoesTransaction.belongsTo(ShoesModel, {foreignKey: 'shoes_id'});

export default ShoesModel;